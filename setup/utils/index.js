const envFile = require('./envFile');
const print = require('./print');
const questions = require('./questions');
const getToken = require('./getToken');

module.exports = { ...envFile, ...print, ...questions, ...getToken };
