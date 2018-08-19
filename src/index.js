const shell = require('shelljs')
const chalk = require('chalk')
const pMap = require('p-map')

const createCommandDebugOutputHandlerWithCommandID = (commandID) => {
  return (data) => {
    // handling multi-line output from commands
    const dataLines = data.split('\n')
    dataLines.forEach((dataLine) => {
      console.log(`${chalk.yellow(`${commandID}: `)}`, dataLine)
    })
    console.log()
  }
}

const execute = (command, commandID, debug = false) => {
  return new Promise((resolve) => {
    console.log(chalk.yellow('\nStarted running: '), chalk.blueBright(command))

    const child = shell.exec(command, { silent: true }, (exitCode, stdout, stderr) => {
      console.log(chalk.yellow('\nFinished running: '), chalk.blueBright(command))
      resolve({
        command,
        exitCode,
        stdout,
        stderr
      })
    })

    const commandDebugOutputHandler = createCommandDebugOutputHandlerWithCommandID(commandID)

    if (debug) {
      child.stdout.on('data', commandDebugOutputHandler)
      child.stderr.on('data', commandDebugOutputHandler)
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
