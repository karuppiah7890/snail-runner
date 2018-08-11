const shell = require('shelljs')
const chalk = require('chalk')
const Aigle = require('aigle')

const execute = command => {
  return new Aigle(resolve => {
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

const executeInParallel = commands => {
  return new Aigle((resolve, reject) => {
    Aigle.parallel(commands.map(command => execute(command)))
      .then(results => {
        resolve(results)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const executeAll = async (allCommands, numberOfParallelCommands) => {
  for (let i = 0; i < allCommands.length; i += numberOfParallelCommands) {
    const commandsToRunInParallel = allCommands.slice(
      i,
      i + numberOfParallelCommands
    )
    try {
      console.log(
        `\n\nGoing to run the following commands in parallel \n${commandsToRunInParallel.join('\n')}\n`
      )

      const results = await executeInParallel(commandsToRunInParallel)
      console.log('\nOutput of the commands:\n')
      results.forEach(result => {
        console.log(chalk.blueBright(`Result of running the below command:`))
        console.log(`$ ${result.command}\n`)

        if (result.exitCode !== 0) {
          console.log(chalk.red(`It failed with exit code ${result.exitCode}\n`))
        } else {
          console.log(chalk.green(`It ran successfully with no errors! :D\n`))
        }

        console.log(chalk.green(`Stdout: \n`))
        console.log(result.stdout)
        console.log(chalk.red(`Stderr: \n`))
        console.log(result.stderr)
      })
    } catch (error) {
      console.log(chalk.red('An error occurred while running the commands in parallel: \n'), error)
      console.log(chalk.blueBright('\n\nThe next set of commands will still continue to run! :D'))
    }
  }
}

module.exports = {
  executeAll
}
