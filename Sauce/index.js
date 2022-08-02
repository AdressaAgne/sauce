const [_n, filename, ...args] = process.argv;
const debug = !args.includes('--build');
const config = Object.assign({
    createIndexHTMLFile : true,
    jsFile : 'app',
    cssFile : 'main',
    title : 'Sauce',
    id : '__sauce',
    dist : !debug ? 'production' : 'dist',
    debug,
    sizes : [480, 680, 1080, 1280, 1680, 1920],
    env : {
        
    },
    swc : {
        "sourceMaps": debug,
        "minify": debug,
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
                            "__DEBUG__": debug.toString()
                        }
                    }
                }
            }
        },
        "$schema": "http://json.schemastore.org/swcrc",
        "module": {
            "type": "commonjs",
            "strict": true,
            "strictMode": true,
            "lazy": false,
            "noInterop": false
            
        }
    }
}, require('../sauce.config'));

const task = require('./libs/task');
const watch = require('./libs/watcher');
const plugins = require('./libs/plugins');
const server = require('./libs/server');

const path = require('path');

const {
    tasks,
    queue,
    javascript,
    scss,
    copy,
    clean,
    nohtml,
    images,
    files2JSON
} = {
    ...task,
    ...plugins
}

tasks('dist',
        //clean(config.dist),
        nohtml(config, config.dist),
        javascript('src/App/app.js', path.join(config.dist, 'js'), config),
        scss('src/scss/main.scss',  path.join(config.dist, 'css'), {config}),
        () => tasks({path : 'src/**/*.*', not : ['.js', '.scss', '.jpeg', '.jpg', '.png', '.json']}, copy(config.dist)),
        server({port : config?.server?.port || 3000, debug, root : config.dist}),
        () => tasks('src/assets/**/*.*', files2JSON(path.join('src', 'App', 'data'))),
        //() => tasks('src/assets/**/*.*', images(config,  path.join(config.dist, 'assets')))
    )
    .then((messages) => {
        if(!debug) return console.log('Ready to publish');
        watch('src/**/*.js', javascript('src/App/app.js',  path.join(config.dist, 'js'), config), nohtml(config, config.dist));
        watch('src/**/*.scss', scss('src/scss/main.scss',  path.join(config.dist, 'css'), {config}), nohtml(config, config.dist));
        watch({path : 'src/**/*.*', not : ['.js', '.scss']}, copy(config.dist));
    });