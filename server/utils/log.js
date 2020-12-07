const color = require('chalk');
const moment = require('moment');

exports.prefix = {
    WEB: { toString: () => { return color.green('[WEB]'); } },
    DATABASE: { toString: () => { return color.cyan('[DB]'); } }
}

exports.info = (prefix = '', message) => {
    console.log(`${getTimestamp()}${prefix} ${message}`);
}

exports.success = (prefix = '', message) => {
    console.log(`${getTimestamp()}${prefix}${color.green(`[DONE]`)} ${message}`);
}

exports.warn = (prefix = '', message) => {
    console.log(`${getTimestamp()}${prefix}${color.yellow(`[WARN]`)} ${message}`);
}

exports.error = (prefix = '', message) => {
    console.log(`${getTimestamp()}${prefix}${color.red(`[ERR]`)} ${message}`);
}

function getTimestamp() {
    return color.gray(`[${moment().format('DD/MM/YY hh:mm:ss')}]`);
}