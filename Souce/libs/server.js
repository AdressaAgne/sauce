const fastify = require('fastify');

/**
 * server setup
 */
 const server = (logger = false) => {
    const server = fastify({
        logger
    });

    server.register(require('@fastify/static'), {
        root: path.join(DIR, 'dist'),
    })

    server.listen(1337, (err, address) => {
        log(color.cyan('server:'), address);
    });
}