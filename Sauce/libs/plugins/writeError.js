const path = require('path');
const writeFile = require('../writeFile');


const errorTempalte = require('../templates/error');



module.exports = (err) => writeFile(path.join(process.cwd(), 'dist', '_error.html'), errorTempalte(err)).then(() => err);