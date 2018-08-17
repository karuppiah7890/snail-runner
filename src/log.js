const chalk = require('chalk')
var UI = require('cliui')

const logDebugInfo = (commands) => {
  console.log(chalk.yellow('\n***Running in DEBUG mode. Commands will be given an ID and the output of the parallely running\n commands will be shown in an interleaved manner while they are executing, with their command ID prefixed***'))

  console.log(chalk.yellow('\n***Running the following commands***'))

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

  console.log(commandsTableUI.toString(), '\n\n')
}

module.exports = {
  logDebugInfo
}
