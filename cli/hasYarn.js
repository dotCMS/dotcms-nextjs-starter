const fs = require('fs')
const path = require('path')
const hasYarn = (cwd = process.cwd()) =>
  fs.existsSync(path.resolve(cwd, 'yarn.lock'))

module.exports = hasYarn
