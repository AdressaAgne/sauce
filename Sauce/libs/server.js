const fs = require('fs').promises;
const http = require('http');

const path = require('path');
const color = require('./color');
const mime = require('mime-types');


module.exports = server = ({
    port = 1337
} = {}) => () => new Promise((resolve, reject) => {

    // Create a local server to receive data from
    const server = http.createServer((req, res) => {
        const url = req.url;
        const error = (err, _, res) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(require('./templates/error')(err));
        }

        const sendFile = (file, _, res) => fs.access(file)
            .then(() => fs.readFile(file), err => error(err, _, res))
            .then(contents => {
                res.writeHead(200, { 'Content-Type': mime.lookup(path.extname(file)) || 'text/plain' });
                res.end(contents);
            }, err => error(err, _, res));

        const pages = {
            '/': (...args) => {
                const errorFile = path.join(process.cwd(), 'dist', '_error.html');
                const indexFile = path.join(process.cwd(), 'dist', 'index.html');

                fs.access(errorFile)
                    .then(() => sendFile(errorFile, ...args)
                        .catch(err => error(err, ...args)))
                    .catch(() => sendFile(indexFile, ...args))
            },
            '*': (...args) => sendFile(path.join(process.cwd(), 'dist', url), ...args)
        }

        const callback = pages[url] || pages['*'] || ((...args) => error(404, ...args));
        callback.call(null, req, res);
    });

    server.listen(port);

    const info = server.address();
    info.address = info.address == '::' ? 'localhost' : info.address;

    resolve({
        out: color.cyan('server: ') + `http://${info.address}:${info.port}`
    });

});