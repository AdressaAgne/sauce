const {tasks, watch} = require('./Souce');


console.log('init');

const test = (nr) => (file) => new Promise((resolve, reject) => {
    console.log(nr, 'hei', file);
    resolve('hihi');
});

watch('src/**/*.js', test(1), test(2));