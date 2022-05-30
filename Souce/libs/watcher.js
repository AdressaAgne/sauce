const fs = require('fs');
const { glob } = require('glob');
const {tasks, task} = require('./task');

const watch = async (files, ...callbacks) => {
    if(typeof files === 'string') {
        return glob(files, (err, files) => {
            if(err) return console.log(err);
            watch(files, ...callbacks);
        });
    }

    console.log('watching', files.length, 'files');

    files.forEach(file => {
        const options = {
            interval: 200
        };
        fs.watchFile(file, options, () => tasks([file], ...callbacks).catch(console.error));
    });
}

module.exports = watch;