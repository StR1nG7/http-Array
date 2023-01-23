const http = require('http');
const UserControllers = require('./controllers');
const { toJSON, onReceivedBody, parseURL } = require('./utils');

const server = http.createServer((req, res) => {
    const { route, id } = parseURL(req);

    if (route === 'users') {
        switch (req.method) {
            case 'GET':
            default:
                const users = toJSON(UserControllers.getUsers());
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(users);
                break;
            case 'POST':
                onReceivedBody(req, body => {
                    const users = toJSON(UserControllers.saveUser(JSON.parse(body)));
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(users);
                });
                break;
            case 'DELETE':
                const result = toJSON(UserControllers.deleteUser(id));
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(result);
                break;
            case 'PUT':
                onReceivedBody(req, body => {
                    const result = toJSON(UserControllers.updateUser(id, JSON.parse(body)));
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(result);
                });
                break;
        }
    }
})

server.listen(8000, () => console.log(`Server listening on port 8000`));