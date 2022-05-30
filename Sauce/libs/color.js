const wrap = (text, color) => color + text + '\u001b[0m';
const color = {
    red: (text) => wrap(text, "\u001b[31m"),
    green: (text) => wrap(text, "\u001b[32m"),
    cyan: (text) => wrap(text, "\u001b[36m")
}

module.exports = color;
