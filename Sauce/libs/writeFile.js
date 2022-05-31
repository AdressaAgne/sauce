const fs = require('fs').promises;
const path = require('path');

module.exports = writeFile = (dist, content) => new Promise((resolve, reject) => {
    return fs.mkdir(path.dirname(dist), { recursive: true }).then(() => {
        return fs.writeFile(dist, content, 'utf-8').then(resolve, reject);
    }, reject)
});