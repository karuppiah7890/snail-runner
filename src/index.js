const shell = require('shelljs')
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
;(async () => {
  const { NUMBER_OF_PARALLEL_COMMANDS = 5 } = process.env
  const numberOfParallelCommands = Number(NUMBER_OF_PARALLEL_COMMANDS)
  const allCommands = process.argv.slice(2)
  for (let i = 0; i < allCommands.length; i += numberOfParallelCommands) {
    const commandsToRunInParallel = allCommands.slice(
      i,
      i + numberOfParallelCommands
    )
    try {
      console.log(
        `Going to run \n${commandsToRunInParallel.join('\n')}\n in parallel`
      )

      const results = await executeInParallel(commandsToRunInParallel)
      console.log('Results\n', results)
    } catch (error) {
      console.log('ERROR', error)
    }
  }
})()
