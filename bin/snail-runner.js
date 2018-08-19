#!/usr/bin/env node

const { executeAll } = require('../src/index.js')
const chalk = require('chalk')
const _ = require('lodash')
const { logDebugInfo } = require('../src/log.js')

const { NUMBER_OF_PARALLEL_COMMANDS = 5, SNAIL_DEBUG: debug = false } = process.env
const numberOfParallelCommands = Number(NUMBER_OF_PARALLEL_COMMANDS)
const allCommands = process.argv.slice(2)

const run = async () => {
  console.log(chalk.yellow('The complete output of all the commands will be shown after running them all'))

  if (debug) {
    logDebugInfo(allCommands)
  }

  let results = []

  try {
    results = await executeAll(allCommands, numberOfParallelCommands, debug)
  } catch (error) {
    console.log(chalk.red('An error occurred while running the commands in parallel: \n'), error)
    process.exit(1)
  }

  console.log(chalk.yellow('\nOutput of the commands:\n'))
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
}

run()
