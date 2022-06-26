const Convert = require('ansi-to-html');
const convert = new Convert();
const encodeHtmlEntities = (encodedStr) => encodedStr.toString().replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';');

module.exports = (err) => /*html*/`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sauce - ${err.code}</title>
    <style>
    pre {
        white-space: pre-wrap;
    }

    * {
        transition: all 0.6s;
        margin: 0;
        padding: 0;
        outline: none;
    }

    html {
        height: 100%;
    }

    body {
        font-family: 'Lato', sans-serif;
        color: #777;
        background: #f9f9f9;
        margin: 0;
    }

    h3 {
        font-weight: 700;
padding: 1rem;
    }

    .error {
        background: rgba(0,0,0,0.4);
        padding: 1rem;
        margin: 1rem;
        text-align: left;
        color: white;
        overflow: scroll;
    }

    a {
        text-decoration: none;
        color: #005379;
    }

    a:hover {
        box-shadow: 0px 2px 0px 0px #005379;
    }

    @keyframes type {
        from {
            box-shadow: inset -3px 0px 0px #005379;
        }

        to {
            box-shadow: inset -3px 0px 0px transparent;
        }
    }

    </style>
</head>
<body>
    <main id="#main">
        <h3>${err.name || err.code || err.file || 'Error'}</h3>
        <pre class="error">${convert.toHtml(encodeHtmlEntities(err))}</pre>
        <pre>${err.cause || ''}</pre>
    </main>
</body>
</html>`.trim();