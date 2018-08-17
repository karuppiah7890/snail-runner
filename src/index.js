const shell = require('shelljs')
const chalk = require('chalk')
const pMap = require('p-map')

const execute = (command, commandID, debug = false) => {
  return new Promise((resolve) => {
    console.log(chalk.yellow('\nStarted running: '), chalk.blueBright(command))

    const child = shell.exec(command, { silent: true }, (exitCode, stdout, stderr) => {
      resolve({
        command,
        exitCode,
        stdout,
        stderr
      })
    })

    if (debug) {
      child.stdout.on('data', function (data) {
        // handling multi-line output from commands
        const dataLines = data.split('\n')
        dataLines.forEach((dataLine) => {
          console.log(`${chalk.yellow(`${commandID}: `)}`, dataLine)
        })
      })
    }
  })
}

const executeFuncWithDebug = (debug = false) => {
  return (command, commandID) => {
    return execute(command, commandID, debug)
  }
}

const executeAll = (commands, numberOfParallelCommands, debug = false) => {
  try {
    const executeWithDebug = executeFuncWithDebug(debug)
    return pMap(commands, executeWithDebug, { concurrency: numberOfParallelCommands })
  } catch (error) {
    throw error
  }
}

module.exports = {
  executeAll
}
