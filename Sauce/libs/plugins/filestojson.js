const path = require('path');
const writeFile = require('../writeFile');

module.exports = (dist) => (f, prevTasks = [], input) => {
    const files = f.map(filename => path.relative(path.dirname(input.replace(/\*/g, '')), filename));
    const obj = files.reduce((p, c) => {
        const {root, dir, base, ext, name} = path.parse(c);
        (p[dir || 'root'] = p[dir || 'root'] || []).push(name);
        return p;
    }, {root : []})
    
    return writeFile(path.join(dist, 'files.json'), JSON.stringify(obj));
};