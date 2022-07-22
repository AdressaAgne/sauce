const path = require('path');
const writeFile = require('../writeFile');


const template = ({title, cssFile, id, jsFile, env}) => /*html*/`
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="/css/${cssFile}.css">
    </head>
    <body>
        <div id="${id}">laster...</div>
        <script>window.env = ${JSON.stringify({id : '#'+id, ...env})}</script>
        <script src="/js/${jsFile}.js"></script>
    </body>
</html>
`.trim();


module.exports = (config, dir, err) => (f, prevTasks = []) => {
    return writeFile(path.join(process.cwd(), dir, 'index.html'), template(config));
}