const fs = require('fs');

module.exports = writeFile = (dist, content, cb) => {
    fs.mkdir(path.dirname(dist), {
        recursive: true
    }, (err) => {
        if (err) return console.log(err);
        fs.writeFile(dist, content, 'utf-8', cb)
    });
}