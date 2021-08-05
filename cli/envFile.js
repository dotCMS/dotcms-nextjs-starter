const fs = require('fs')

const parseEnvFile = (file) => {
  return Object.assign(
    ...file
      .toString()
      .split('\n')
      .filter((line) => /^([^=:#]+?)[=:](.*)/.test(line))
      .map((line) => {
        const [key, value] = line.split('=')
        return {
          [key]: value,
        }
      })
  )
}

const createEnvFile = (params) => {
  const content = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('\n')

  return new Promise((resolve, reject) => {
    fs.writeFile('.env', content, (err, data) => {
      resolve(data)
    })
  })
}

const getParsedEnvFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('.env', 'utf8', async (err, file) => {
      const parsedEnvFile = err ? null : parseEnvFile(file)
      resolve(parsedEnvFile)
    })
  })
}

module.exports = { createEnvFile, getParsedEnvFile }
