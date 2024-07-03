import { Command } from 'commander';

import { getInput } from '@services/get/getInput';

export function createGetCommand(): Command {
  const getCommand = new Command('get').description('Get various resources from Advent of Code');

  getCommand
    .command('input <yearDay> <destination>')
    .description('Get input for the specified year and day puzzle')
    .action(async (yearDay: string, destination: string) => {
      await getInput(yearDay, destination);
    });

  getCommand
    .command('problem <yearDay> <destination>')
    .description('Get problem statement for the specified year and day puzzle')
    .action(async (yearDay: string, destination: string) => {
      await getProblemStatement(yearDay, destination);
    });

  return getCommand;
}
