const fs = require('fs').promises;
const path = require('path');

const blacklisted = ['src', 'node_modules', 'Sauce'];

module.exports = (dir) => {
    return (_) => new Promise((resolve, reject) => {
        dir = path.normalize(dir);

        for (let i = 0; i < blacklisted.length; i++) {
            const item = path.normalize(blacklisted[i]);
            if(dir.slice(0, item.length) == item) {
                return reject('Can not remove ' + dir)
            }
        }

        return fs.rm(path.join(process.cwd(), dir), {recursive : true})
            .then(() => resolve())
            .catch(() => resolve())
    });
}