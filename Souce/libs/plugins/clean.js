const { exec } = require("child_process");

const cleanFolder = (dist) => clean = (cb, file) => {
    exec(`rm -rf ${path.join(DIR, dist)}`, (error, success, stderr) => cb(error ? {
        error
    } : {
        success
    }));
}