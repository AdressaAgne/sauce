const fs = require('fs').promises;
const path = require('path');

module.exports = dist => files => Promise.all(files.map(file => {
    const from = path.join(process.cwd(), file);
    const distPath = file.split(path.sep).slice(1).join(path.sep);
    const to = path.join(process.cwd(), dist, distPath);

    return fs.mkdir(path.dirname(to), { recursive: true })
        .then(() => fs.copyFile(from, to))
}));