const fastify = require('fastify');
const path = require('path');
const color = require('./color');
/**
 * server setup
 */
module.exports = server = ({
    port = 1337,
    logger = false
}) => {
    const server = fastify({
        logger
    });

    server.register(require('@fastify/static'), {
        root: path.join(process.cwd(), 'dist'),
    })

    server.listen(port, (err, address) => {
        console.log('[Sauce]:', color.cyan('server:'), address);
    });
}