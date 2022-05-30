const { config } = require('@swc/core/spack');
const options = require('../package.json');
const path = require('path');

module.exports = config({
    options : options.swc,
    entry: {
        'app': path.join(__dirname, 'src/app/app.js'),
    },
    output: {
        path: __dirname + '/dist/js'
    },
    module: {},
    mode : 'production'
    
});