const sass = require('node-sass');
const path = require('path');
const writeFile = require('../writeFile');

module.exports = (file, dist, options) => {
    options = Object.assign({
        entry: path.join(process.cwd(), file)
    }, options);

    const output = path.join(process.cwd(), dist, path.basename(file));

    return (_) => new Promise((resolve, reject) => {
        sass.render({ file: options.entry }, (error, data) => {
            if (error) return reject(error);

            const filename = output.replace('.scss', '.css');
            const content = data.css.toString();

            writeFile(filename, content)
                .then(resolve, reject);
        });
    })
};