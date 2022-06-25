const path = require('path');
const swc = require('@swc/core');
const writeFile = require('../writeFile');

const bundler = (file, dist, config) => {
    const options = Object.assign({
        options: config.swc,
        mode: 'debug',
        target: 'browser',
        entry: path.join(process.cwd(), file)
    });
    
    return (_) => new Promise((resolve, reject) => {
        return swc.bundle(options)
            .then(data => {
                const files = Object.entries(data).map(([filename, { code, map }]) => {
                    return { filename, content : code, map };
                });

                const writeFiles = [];

                files.forEach(({filename, content, map}) => {
                    const ext = path.extname(filename);
                    const distPath = path.join(process.cwd(), dist, filename);
                    const distMapPath = distPath.replace(ext, '.map' + ext)

                    writeFiles.push(writeFile(distPath, content));
                    if(map) writeFiles.push(writeFile(distMapPath, map));
                });

                return Promise.all(writeFiles).then(() => resolve({info : {html : true}}), reject);
        }, reject)
    });
};

module.exports = bundler;