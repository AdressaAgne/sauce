const task = require('./libs/task');

const watch = require('./libs/watcher');
const plugins = require('./libs/plugins');
const server = require('./libs/server');


module.exports = {
    watch,
    server,
    ...task,
    ...plugins
}