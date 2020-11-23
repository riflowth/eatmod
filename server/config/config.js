let config = require('./config.json');

Object.keys(config).forEach(key => {
    process.env[key] = config[key];
});