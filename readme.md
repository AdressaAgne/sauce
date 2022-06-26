# Sauce 0.1.0

install : `$npm i`
run: `$ npm run dev`

Simple lib to generate js and css. trying use the least amount of packages.

## todo

- [x] SWC compiler
- [x] SCSS compiler
- [x] copy
- [x] clean
- [x] server
- [x] file watcher
- [x] super simple vDom
- [x] parsing errors on server
- [x] sauce.config.js
- [ ] vDom with reactive states
- [ ] JS to generate static html
- [ ] Image Processor
- [ ] Build


Packages and reasoning:
 - @swc/cli" : Compile JS
 - @swc/core : Compile JS
 - node-sass : Compile Sass
 - ansi-to-html : convert shell error messages
 - cli-progress : i'm lazy... should be removed
 - glob : could probably be removed, but makes things easy.
 - mime-types : its a big DB of mime-types, takes forever to do manually.
