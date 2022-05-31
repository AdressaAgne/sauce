const fastify = require('fastify');
const path = require('path');
const color = require('./color');
/**
 * server setup
 */
module.exports = server = ({port = 1337, logger = false} = {}) => () => new Promise((resolve, reject) => {
    const server = fastify({
        logger
    });

    server.register(require('@fastify/static'), {
        root: path.join(process.cwd(), 'dist'),
    })

    server.listen(port, (err, address) => {
        if(err) return reject(err.message);
        resolve(color.cyan('server: ') + address);
    });
});