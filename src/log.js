const chalk = require('chalk')
const UI = require('cliui')

const logDebugInfo = (commands) => {
  console.log(chalk.yellow('\n***Running in DEBUG mode. Commands will be given an ID and the output of the parallely running\n commands will be shown in an interleaved manner while they are executing, with their command ID prefixed***'))

  console.log(chalk.yellow('\n***Running the following commands***'))

  const commandsTable = createCommandsTable(commands)

  console.log(commandsTable, '\n\n')
}

const createCommandsTable = (commands) => {
  const commandsTableUI = UI()

  commandsTableUI.div(
    {
      text: chalk.yellow('CommandID'),
      width: 20
    },
    { text: chalk.yellow('Command') }
  )

  commands.forEach((command, commandID) => {
    commandsTableUI.div(
      {
        text: chalk.yellow(commandID),
        width: 20
      },
      { text: chalk.blueBright(command) }
    )
  })

  return commandsTableUI.toString()
}

module.exports = {
  logDebugInfo
}
