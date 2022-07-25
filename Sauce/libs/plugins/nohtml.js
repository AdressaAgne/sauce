const path = require('path');
const writeFile = require('../writeFile');

const attrs = attr => Object.entries(attr).map(([key, value], i) => `${key}="${value}"`).join(' ');

const tag = (tag, attr, closing = false) => {
    return closing ? `<${tag} ${attrs(attr)}></${tag}>` : `<${tag} ${attrs(attr)} />`;
}

const template = ({title, cssFile, id, jsFile, meta = [], links = [], env}) => /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
    ${meta.map(attr => tag('meta', attr)).join("\n\t")}
    ${links.map(attr => tag('link', attr)).join("\n\t")}
    <title>${title}</title>
</head>
<body>
    <div id="${id}">laster...</div>
    <script>window.env = ${JSON.stringify({id : '#'+id, ...env})}</script>
    <script src="/js/${jsFile}.js" defer></script>
</body>
</html>
`.trim();


module.exports = (config, dir, err) => (f, prevTasks = []) => {
    return writeFile(path.join(process.cwd(), dir, 'index.html'), template(config));
}