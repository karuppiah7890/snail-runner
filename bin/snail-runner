#!/usr/bin/env node

const { executeAll } = require('../src/index.js')

const { NUMBER_OF_PARALLEL_COMMANDS = 5, SNAIL_DEBUG: debug = false } = process.env
const numberOfParallelCommands = Number(NUMBER_OF_PARALLEL_COMMANDS)
const allCommands = process.argv.slice(2)

executeAll(allCommands, numberOfParallelCommands, debug)
