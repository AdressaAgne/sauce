const fs = require('fs');
const http = require('http');

const path = require('path');
const color = require('./color');


module.exports = server = ({
    port = 1337,
    logger = false
} = {}) => () => new Promise((resolve, reject) => {

    // Create a local server to receive data from
    const server = http.createServer((req, res) => {
        const url = req.url;
        const error = (err, req, res) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(require('./templates/error')(err));
        }

        const pages = {
            '/': (req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                if (fs.existsSync('dist/_error.html')) return res.end(fs.readFileSync('dist/_error.html'))
                return res.end(fs.readFileSync('dist/index.html'));
            },
            '*': (req, res) => {
                const file = path.join(process.cwd(), 'dist', url);
                fs.promises.access(file).then(() => res.end(fs.readFileSync(file)), err => error(err, req, res));
            }
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