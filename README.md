# Snail Runner

Snail Runner is meant to run many shell commands in parallel and then give output for each of them. Example:

![Snail Runner Demo](demos/demo.svg)

Given a set of commands, by default it runs 5 commands in parallel at once and then moves on to the next set of commands to run in parallel. You can also set the number of commands to run in parallel using the environment variable `NUMBER_OF_PARALLEL_COMMANDS` :tada:

![Snail Runner Demo](demos/another-demo.svg)