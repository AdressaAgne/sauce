const {tasks, watch, javascript, scss, server, copy} = require('./Sauce');


const logFilename = (nr) => (file) => new Promise((resolve, reject) => resolve([nr, file]));


javascript('src/app/app.js', 'dist/js/', {})();
scss('src/scss/main.scss', 'dist/css/', {})();

watch('src/**/*.js', javascript('src/app/app.js', 'dist/js/', {}), logFilename(1));
watch('src/**/*.scss', scss('src/scss/main.scss', 'dist/css/', {}), logFilename(2));
watch('src/**/*.html', copy('dist'), logFilename(3));

server(1337);