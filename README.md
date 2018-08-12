# Snail Runner

```
$ npm i -g snail-runner
$ snail-runner
```

or

```
$ npx snail-runner
```

Snail Runner is meant to run many shell commands in parallel and then give output for each of them. A demo : 

[![asciicast](https://asciinema.org/a/196065.png)](https://asciinema.org/a/196065)

Given a set of commands, by default it runs 5 commands in parallel at once and then moves on to the next set of commands to run in parallel. You can also set the number of commands to run in parallel using the environment variable `NUMBER_OF_PARALLEL_COMMANDS` :tada:

```
NUMBER_OF_PARALLEL_COMMANDS=10 snail-runner 'sleep 1' 'sleep 2' 'sleep 3' 'sleep 4' 'sleep 5' 'sleep 1' 'sleep 2' 'sleep 3' 'sleep 4' 'sleep 5' 'sleep 1' 'sleep 2' 'sleep 4'
```

And to debug many long running commands running in parallel, you can set the `SNAIL_DEBUG` environment variable to enable debug mode 😁 

```
SNAIL_DEBUG=true snail-runner 'sleep 1; echo "ok"; sleep 5'
```

Snail runner will show the outputs of the commands in an interleaved manner with the command ID prefixed to know which command gave that output. The command ID and command mapping is also shown in debug mode in a table format. In this mode, the consolidated output is *also* shown at the end, for all the commands, when all of them finish running.

See the asciinema to see snail-runner in action and try it out yourself! It's just a command away 😄