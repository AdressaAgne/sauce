const {
    tasks,
    queue,
    watch,
    javascript,
    scss,
    server,
    copy,
    clean
} = require('./Sauce');

tasks('dist',
        clean('dist'),
        javascript('src/js/app.js', 'dist/js/', {}),
        scss('src/scss/main.scss', 'dist/css/', {}),
        server()
    )
    .then(tasks('src/**/*.html', copy('dist')))
    .then((messages) => {
        watch('src/**/*.js', javascript('src/js/app.js', 'dist/js/', {}));
        watch('src/**/*.scss', scss('src/scss/main.scss', 'dist/css/', {}));
        watch('src/**/*.html', copy('dist'));
    });