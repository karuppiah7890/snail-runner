#!/usr/bin/env node

const { executeAll } = require('../src/index.js')
var UI = require('cliui')
const chalk = require('chalk')
const _ = require('lodash')

const { NUMBER_OF_PARALLEL_COMMANDS = 5, SNAIL_DEBUG: debug = false } = process.env
const numberOfParallelCommands = Number(NUMBER_OF_PARALLEL_COMMANDS)
const allCommands = process.argv.slice(2)

const run = async () => {
  console.log(chalk.yellow('The complete output of all the commands will be shown after running them all'))

  if (debug) {
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

    allCommands.forEach((command, commandID) => {
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

  try {
    const results = await executeAll(allCommands, numberOfParallelCommands, debug)

    console.log('\nOutput of the commands:\n')
    results.forEach(result => {
      console.log(chalk.yellow('Result of running the below command:'))
      console.log(`$ ${chalk.blueBright(result.command)}\n`)

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
  }
}

run()
