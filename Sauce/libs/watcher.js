const fs = require('fs');
const { glob } = require('glob');
const {queue} = require('./task');
const color = require('./color');

const watch = (files, ...callbacks) => {
    if(typeof files === 'string') {
        return glob(files, (err, files) => {
            if(err) return console.log(err);
            watch(files, ...callbacks);
        });
    }

    console.log('[Sauce]:', color.cyan('watching'), files.length > 2 ? color.green(files[0]) + ' and ' + color.green(files.length-1) + ' other files' : color.green(files.join(' and ')));

    files.forEach(file => {
        const options = {
            interval: 200
        };

        fs.watchFile(file, options, () => {
            queue([file], callbacks, [])
                .then((success) => {
                    console.log(color.green('[Sauce]:'), 'file changed ' + file);
                })
                .catch((err) => {
                    console.log(color.red('[Sauce]:'), 'file changed with error ' + file);
                });
        });
    });
}

module.exports = watch;