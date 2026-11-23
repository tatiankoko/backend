require('dotenv').config();

const http = require('http');
const getUsers = require('./modules/users');

const port = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

    const url = new URL(request.url, 'http://127.0.0.1');
    const { searchParams } = url;

    if (searchParams.has('hello')) {
        const name = searchParams.get('hello');

        response.statusCode = name ? 200 : 400;
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.write(name ? `Hello, ${name}.` : 'Enter a name');
        response.end();

        return;
    }

    if (searchParams.has('users')) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(getUsers());
        response.end();

        return;
    }

    if (searchParams.size === 0) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.write('Hello, World!');
        response.end();

        return;
    }

    response.statusCode = 500;
    response.end();
});

server.listen(port, ()=> console.log(`Server started on http://127.0.0.1:${port}`));