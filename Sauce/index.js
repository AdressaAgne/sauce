const {
    task,
    tasks
} = require('./libs/task');

const watch = require('./libs/watcher');
const plugins = require('./libs/plugins');
const server = require('./libs/server');


module.exports = {
    watch,
    task,
    tasks,
    server,
    ...plugins
}