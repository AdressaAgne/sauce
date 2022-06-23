const config = Object.assign({
    createIndexHTMLFile : true,
    jsFile : 'app',
    cssFile : 'main',
    title : 'Sauce',
    id : '__sauce',
    dist : 'dist',
}, require('../sauce.config'));

const task = require('./libs/task');
const watch = require('./libs/watcher');
const plugins = require('./libs/plugins');
const server = require('./libs/server');

const path = require('path');

const {
    tasks,
    queue,
    javascript,
    scss,
    copy,
    clean,
    nohtml
} = {
    ...task,
    ...plugins
}

tasks('dist',
        clean(config.dist),
        nohtml(config, config.dist),
        javascript('src/App/app.js', path.join(config.dist, 'js'), {}),
        scss('src/scss/main.scss',  path.join(config.dist, 'css'), {}),
        server({port : config?.server?.port || 3000})
    )
    
    .then(tasks('src/**/*.html', copy(config.dist)))

    .then((messages) => {
        watch('src/**/*.js', javascript('src/App/app.js',  path.join(config.dist, 'js'), {}));
        watch('src/**/*.scss', scss('src/scss/main.scss',  path.join(config.dist, 'css'), {}));
        watch('src/**/*.html', copy(config.dist));
    });