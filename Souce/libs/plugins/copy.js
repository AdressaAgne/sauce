const { exec } = require("child_process");


const copyFile = (dist) => copy = (cb, file) => {
    exec(`mkdir -p ${path.join(DIR, dist)} && cp -R ${path.join(DIR, file)} ${path.join(DIR, dist)}`, (error, success, stderr) => cb(error ? {
        error
    } : {
        success
    }));
}