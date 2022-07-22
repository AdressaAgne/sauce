const path = require('path');
const writeFile = require('../writeFile');
const sharp = require('sharp');


module.exports = (config, dist, err) => (f, prevTasks = [], input) => Promise.all(f.map(filename => {
    const file = path.join(dist, path.relative(path.dirname(input.replace(/\*/g, '')), filename));
    const distDir = path.dirname(file);
    const sizes = config.sizes || [1080, 1920];
    const {name} = path.parse(file);


    return Promise.all(sizes.map(size => new Promise(async (resolve, reject) => {
        const distFilename = path.join(distDir, name + '-' + size + '.webp');

        const buffer = await sharp(filename).resize(size).webp({
            quality: 80
        }).toBuffer();
    
        writeFile(distFilename, buffer).then(resolve, reject);
    })));
}));