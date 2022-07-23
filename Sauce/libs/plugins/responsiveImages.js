const path = require('path');
const writeFile = require('../writeFile');
const sharp = require('sharp');


const specialCases = {
    'apple-touch-icon' : {
        type : 'png',
        size : 180
    }
}

module.exports = (config, dist, err) => (f, prevTasks = [], input) => Promise.all(f.map(filename => {
    const file = path.join(dist, path.relative(path.dirname(input.replace(/\*/g, '')), filename));
    const distDir = path.dirname(file);
    const sizes = config.sizes || [1080, 1920];
    const {name} = path.parse(file);

    if(specialCases[name]) {
        const {type, size} = specialCases[name];
        return new Promise(async (resolve, reject) => {
            const distFilename = path.join(distDir, name + '.' + type);
            
            const buffer = await sharp(filename).resize(size)[type]({
                quality: 80
            }).toBuffer();
        
            writeFile(distFilename, buffer).then(resolve, reject);
        });
    }


    return Promise.all(sizes.map(size => new Promise(async (resolve, reject) => {
        const distFilename = path.join(distDir, name + '-' + size + '.webp');

        const buffer = await sharp(filename).resize(size).webp({
            quality: 80
        }).toBuffer();
    
        writeFile(distFilename, buffer).then(resolve, reject);
    })));
}));