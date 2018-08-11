# Snail

Snail is meant to run many shell commands in parallel and then give output for each of them. Example:

```sh
$ node src/index.js 'sleep 5' 'sleep 20' 'sleep 15' 'sleep 10'

Going to run the following commands in parallel
 sleep 5
sleep 20
sleep 15
sleep 10


Results
 [ { command: 'sleep 5', exitCode: 0, stdout: '', stderr: '' },
  { command: 'sleep 20', exitCode: 0, stdout: '', stderr: '' },
  { command: 'sleep 15', exitCode: 0, stdout: '', stderr: '' },
  { command: 'sleep 10', exitCode: 0, stdout: '', stderr: '' } ]
```

Given a set of commands, by default it runs 5 commands in parallel at once and then moves on to the next set of commands to run in parallel. You can also set the number of commands to run in parallel using the environment variable `NUMBER_OF_PARALLEL_COMMANDS` :tada:

```sh
$ NUMBER_OF_PARALLEL_COMMANDS=10 node src/index.js 'sleep 30' 'sleep 20' 'sleep 15' 'sleep 10' 'ls' 'sleep 10' 'date' 'pwd' 'whoami'

Going to run the following commands in parallel
 sleep 30
sleep 20
sleep 15
sleep 10
ls
sleep 10
date
pwd
whoami


Results
 [ { command: 'sleep 30', exitCode: 0, stdout: '', stderr: '' },
  { command: 'sleep 20', exitCode: 0, stdout: '', stderr: '' },
  { command: 'sleep 15', exitCode: 0, stdout: '', stderr: '' },
  { command: 'sleep 10', exitCode: 0, stdout: '', stderr: '' },
  { command: 'ls',
    exitCode: 0,
    stdout:
     'README.md\nnode_modules\npackage-lock.json\npackage.json\nsrc\n',
    stderr: '' },
  { command: 'sleep 10', exitCode: 0, stdout: '', stderr: '' },
  { command: 'date',
    exitCode: 0,
    stdout: 'Sat Aug 11 22:58:14 IST 2018\n',
    stderr: '' },
  { command: 'pwd',
    exitCode: 0,
    stdout: '/Users/karuppiah/projects/oss/snail\n',
    stderr: '' },
  { command: 'whoami',
    exitCode: 0,
    stdout: 'karuppiah\n',
    stderr: '' } ]
```
