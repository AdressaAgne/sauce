const glob = require('glob');
const color = require('./color');
const cliProgress = require('cli-progress');

const task = (files, callback) => new Promise((resolve, reject) => {
    if (!callback || typeof callback !== 'function') return reject({
        error: 'callback of task is not a function'
    });

    if (typeof files === 'string') {
        return glob(files, (err, arr) => {
            if (err) return reject(err);
            callback(arr).then(resolve, reject);
        });
    }

    return callback(files).then(resolve, reject);
});

const queue = (files, callbacks, values = []) => new Promise(async (resolve, reject) => {
    const bar = new cliProgress.MultiBar({
            format: color.cyan('{bar}') + ' {value}/{total} Tasks',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
            clearOnComplete: true,
            stopOnComplete: true,
            forceRedraw: true
        });

    const b1 = bar.create(callbacks.length, 0);
    const messages = [];

    for await (const callback of callbacks) {
        await task(files, callback)
            .then((success) => {
                b1.increment();
                bar.log(color.green('[Sauce]: ') + success + "\n");
                values.push(success);
                messages.push({success});
            })
            .catch((error) => {
                bar.log(color.red('[Sauce]: ') + error + "\n");
                messages.push({error});
            });
    }

    bar.stop();

    for (let i = 0; i < messages.length; i++) {
        const {error, success} = messages[i];
        if(error) console.error(color.red('[Sauce]:'), error);
        if(success) console.error(color.green('[Sauce]:'), success);
    }

    resolve(values);
});

const tasks = (files, ...callbacks) => queue(files, callbacks);

module.exports = {
    task,
    tasks,
    queue
};