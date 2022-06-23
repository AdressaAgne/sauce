const path = require('path');
const writeFile = require('../writeFile');

const template = ({title, cssFile, id, jsFile}) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="css/${cssFile}.css">
</head>
<body>
    <div id="${id}"></div>
    <script src="js/${jsFile}.js"></script>
</body>
</html>`;


module.exports = (config, dir) => (_) => writeFile(path.join(process.cwd(), dir, 'index.html'), template(config));