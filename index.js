const log = (...args) => console.log('[Souce]:', ...args);
const noop = () => {};
const {
    exec
} = require("child_process");
const fs = require('fs');
const path = require('path');
const fastify = require('fastify');
const glob = require("glob");
const sass = require('node-sass');

const wrap = (text, color) => color + text + '\u001b[0m';
const color = {
    red: (text) => wrap(text, "\u001b[31m"),
    green: (text) => wrap(text, "\u001b[32m"),
    cyan: (text) => wrap(text, "\u001b[36m")
}

const writeFile = (dist,content, cb) => {
    fs.mkdir(path.dirname(dist), {
        recursive: true
    }, (err) => {
        if (err) return console.log(err);
        fs.writeFile(dist, content, 'utf-8', cb)
    });
}

/**
 * Tasks
 */
const compileJavaScript = (file, dist) => javaScriptCompiler = (cb, _) => exec(`npx spack`, (error, success, stderr) => cb(error ? {
    error
} : {
    success
}));

const compileSass = (file, dist) => sassCompiler = (cb, _) => {
    sass.render({
        file: path.join(__dirname, file),
    }, function (error, success) {
        if (error) return cb({
            error
        });
        writeFile(path.join(__dirname, dist, path.basename(file).replace('.scss', '.css')), success.css.toString(), (error, success) => {
            return cb(error ? {
                error
            } : {
                success
            })
        })

    });
}

const copyFile = (dist) => copy = (cb, file) => {
    exec(`mkdir -p ${path.join(__dirname, dist)} && cp -R ${path.join(__dirname, file)} ${path.join(__dirname, dist)}`, (error, success, stderr) => cb(error ? {
        error
    } : {
        success
    }));
}
const cleanFolder = (dist) => clean = (cb, file) => {
    exec(`rm -rf ${path.join(__dirname, dist)}`, (error, success, stderr) => cb(error ? {
        error
    } : {
        success
    }));
}

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

/**
 * server setup
 */
const server = (logger = false) => {
    const server = fastify({
        logger
    });

    server.register(require('@fastify/static'), {
        root: path.join(__dirname, 'dist'),
    })

    server.listen(1337, (err, address) => {
        log(color.cyan('server:'), address);
    });
}

/**
 * Watch a file, do something when it changes
 * @param {String} file 
 * @param {Function} callback Promise
 */
const watch = async (globFiles, callback, cb) => {
    glob(globFiles, (err, files) => {
        if (err) return log(err);

        log(color.cyan('Watching...'), files.length > 1 ? (globFiles + ' (' + files.length + ' files)') : globFiles);

        files.forEach(file => {
            runTasks(file, callback, e => {
                fs.watchFile(path.join(__dirname, file), {
                    interval: 200
                }, (curr, prev) => runTasks(file, callback));
            });
        });

        if (cb && typeof cb == 'function') cb();
    });
}


cleanFolder('dist/')(e => {
    watch('src/app/app.js', compileJavaScript('src/app/app.js', 'dist/js'));
    watch('src/**/*.scss', compileSass('src/scss/main.scss', 'dist/css'));
    watch('src/**/*.html', copyFile('dist/'), server);
});