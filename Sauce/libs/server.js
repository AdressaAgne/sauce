const fs = require('fs').promises;
const http = require('http');

const path = require('path');
const color = require('./color');
const mime = require('mime-types');


module.exports = server = ({
    port = 1337,
    debug = true,
    root = 'dist',
} = {}) => () => new Promise((resolve, reject) => {
    if(!debug) return resolve();
    // Create a local server to receive data from
    const server = http.createServer((req, res) => {
        res.setHeader("server", "Sauce");

        const url = req.url;
        const error = (err, _, res) => {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end(require('./templates/error')(err));
        }

        const sendFile = (file, _, res) => fs.access(file)
            .then(() => fs.readFile(file).then(contents => {
                res.writeHead(200, {
                    'Content-Type': mime.lookup(path.extname(file)) || 'text/plain'
                });
                res.end(contents);
            }, err => error(err, _, res)), err => error(err, _, res))
            

        const pages = {
            '/': (...args) => {
                const errorFile = path.join(process.cwd(), root, '_error.html');
                const indexFile = path.join(process.cwd(), root, 'index.html');

                fs.access(errorFile)
                    .then(() => sendFile(errorFile, ...args)
                        .catch(err => error(err, ...args)))
                    .catch(() => sendFile(indexFile, ...args))
            },
            '*': (...args) => sendFile(path.join(process.cwd(), root, url), ...args)
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