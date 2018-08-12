const shell = require('shelljs')
const chalk = require('chalk')
const pLimit = require('p-limit')
const _ = require('lodash')

const execute = command => {
  return new Promise((resolve) => {
    console.log(chalk.yellow('\nStarted running: '), chalk.blueBright(command));

    shell.exec(command, { silent: true }, (exitCode, stdout, stderr) => {
      resolve({
        command,
        exitCode,
        stdout,
        stderr
      })
    })
  })
}

const executeAll = async (commands, numberOfParallelCommands) => {
  try {
      console.log(chalk.yellow('The output of all the commands will be shown after running them all'))
      const limit = pLimit(numberOfParallelCommands)
      const commandsToRunInParallel = commands.map(command => limit(() => execute(command)))

      const results = await Promise.all(commandsToRunInParallel)
      console.log('\nOutput of the commands:\n')
      results.forEach(result => {
        console.log(chalk.blueBright('Result of running the below command:'))
        console.log(`$ ${result.command}\n`)

        if (result.exitCode !== 0) {
          console.log(chalk.red(`It failed with exit code ${result.exitCode}\n`))
        } else {
          console.log(chalk.green(`It ran successfully with no errors! :D\n`))
        }

        const { stdout, stderr } = result
        if (!_.isEmpty(_.trim(stdout))) {
          console.log(chalk.green(`Stdout:`))
          console.log(stdout)
        }

        if (!_.isEmpty(_.trim(stderr))) {
          console.log(chalk.red(`Stderr:`))
          console.log(stderr)
        }
      })
    } catch (error) {
      console.log(chalk.red('An error occurred while running the commands in parallel: \n'), error)
      console.log(chalk.blueBright('\n\nThe next set of commands will still continue to run! :D'))
    }
}

module.exports = {
  executeAll
}
