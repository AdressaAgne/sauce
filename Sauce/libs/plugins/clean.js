const fs = require('fs').promises;
const path = require('path');

const blacklisted = ['src', 'node_modules', 'Sauce'];

module.exports = (dir) => {
    return (_) => new Promise(async (resolve, reject) => {

        dir = path.normalize(dir);

        let needCleaning = true;

        fs.access(path.join(process.cwd(), dir)).then(() => {}, () => {
            needCleaning = false;
            resolve()
        });

        if(!needCleaning) return;

        for (let i = 0; i < blacklisted.length; i++) {
            const item = path.normalize(blacklisted[i]);
            if(dir.slice(0, item.length) == item) {
                return reject('Can not remove ' + dir)
            }
        }

        return await fs.rm(dir, {recursive : true}).then(resolve, resolve)
    });
}