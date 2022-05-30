const sass = require('node-sass');

const compileSass = (file, dist) => sassCompiler = (cb, _) => {
    sass.render({
        file: path.join(DIR, file),
    }, function (error, success) {
        if (error) return cb({
            error
        });
        writeFile(path.join(DIR, dist, path.basename(file).replace('.scss', '.css')), success.css.toString(), (error, success) => {
            return cb(error ? {
                error
            } : {
                success
            })
        })

    });
}