const glob = require('glob');


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

const tasks = (files, ...callbacks) => Promise.all(callbacks.map(callback => task(files, callback)))

module.exports = {
    task,
    tasks
};