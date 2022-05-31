const path = require('path');
const swc = require('@swc/core');
const writeFile = require('../writeFile');

const transformOptions = {
    "sourceMaps": true,
    "minify": true,
    "jsc": {
        "target": "es5",
        "parser": {
            "syntax": "ecmascript",
            "jsx": true,
            "dynamicImport": false,
            "privateMethod": true,
            "functionBind": false,
            "exportDefaultFrom": false,
            "exportNamespaceFrom": false,
            "decorators": false,
            "decoratorsBeforeExport": false,
            "topLevelAwait": false,
            "importMeta": false,
            "preserveAllComments": false
        },
        "transform": {
            "react": {
                "pragma": "vNode",
                "pragmaFrag": "vFragment",
                "throwIfNamespace": true,
                "development": false,
                "useBuiltins": false
            },
            "optimizer": {
                "globals": {
                    "vars": {
                        "__DEBUG__": "true"
                    }
                }
            }
        }
    },
    "$schema": "http://json.schemastore.org/swcrc",
    "module": {
        "type": "commonjs",
        "strict": false,
        "strictMode": true,
        "lazy": false,
        "noInterop": false
    }
}

const bundler = (file, dist, options) => {
    options = Object.assign({
        options: transformOptions,
        mode: 'debug',
        target: 'browser',
        entry: path.join(process.cwd(), file)
    }, options);

    return (_) => swc.bundle(options)
        .then(data => {
            const files = Object.entries(data).map(([filename, { code, map }]) => {
                return { filename, content : code, map };
            });

            const writeFiles = [];

            files.forEach(({filename, content, map}) => {
                const ext = path.extname(filename);
                const distPath = path.join(process.cwd(), dist, filename);
                const distMapPath = distPath.replace(ext, '.map' + ext)

                writeFiles.push(writeFile(distPath, content));
                if(map) writeFiles.push(writeFile(distMapPath, map));
            });

            return Promise.all(writeFiles).then(() => '');
        });
};

module.exports = bundler;