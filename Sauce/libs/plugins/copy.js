const {promises : fs, constants} = require('fs');
const path = require('path');

module.exports = (dist) => {
    return (files) => Promise.all(files.map(file => {
        const from = path.join(process.cwd(), file);
        const to = path.join(process.cwd(), dist, path.basename(file));
        return fs.copyFile(from, to, constants.COPYFILE_FICLONE)
    })).then(() => '');
}