const fs = require('fs');
const { glob } = require('glob');
const {queue} = require('./task');
const color = require('./color');

const watch = async (files, ...callbacks) => {
    if(typeof files === 'string') {
        return glob(files, (err, files) => {
            if(err) return console.log(err);
            watch(files, ...callbacks);
        });
    }

    console.log('[Sauce]:', color.cyan('watching'), files.length > 1 ? color.green(files[0]) + ' and ' + color.green(files.length-1) + ' other files' : color.green(files.join(', ')));

    files.forEach(file => {
        const options = {
            interval: 200
        };
        fs.watchFile(file, options, () => {
            queue([file], callbacks, [], false)
                .then((success) => console.log('done', file))
                .catch((err) => console.error(err));
        });
    });
}

module.exports = watch;