const getResetColors = () => `\x1b[0m`

const DOTCMS = 'DotCMS'
const printBright = (text) => console.info('\x1b[1m', text, getResetColors())

const printHeading = (title) => {
  const line = new Array(title.length + 4).fill('-').join('')
  console.info('\n')
  printBright(title)
  console.info(line)
}

const printError = (error) => {
  console.info(`\x1b[41m\x1b[37m${error}${getResetColors()}`)
}

module.exports = {
  DOTCMS,
  printBright,
  printHeading,
  printError,
}
