const compileJavaScript = (file, dist) => javaScriptCompiler = (cb, _) => exec(`npx spack`, (error, success, stderr) => cb(error ? {
    error
} : {
    success
}));