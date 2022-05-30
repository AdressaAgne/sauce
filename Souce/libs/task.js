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


const tasks = (files, ...callbacks) => new Promise((resolve, reject) => {
    Promise.all(callbacks.map(callback => task(files, callback))).then(resolve, reject);
});



module.exports = {
    task,
    tasks
};

/**
const runTask = (file, callback, cb) => {
    if (callback && typeof callback == 'function') {
        callback(({
            error,
            success
        }) => {
            if (error) return log(color.red(callback.name), error);
            log(color.green(callback.name));
            if (cb && typeof cb == 'function') cb();
        }, file)
    }
}

const runTasks = (file, tasks, cb) => {
    if (typeof tasks == 'function') return runTasks(file, [tasks], cb);
    if (tasks.length < 1 || !(tasks instanceof Array)) return cb && typeof cb == 'function' ? cb() : null;

    const task = tasks.shift();
    runTask(file, task, () => runTasks(file, tasks, cb));
}
 */