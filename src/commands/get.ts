import { Command } from 'commander';

import { getInput } from '../services/get/getInput';

export function createGetCommand(): Command {
  const getCommand = new Command('get').description('Get various resources from Advent of Code');

  getCommand
    .command('input <yearDayPart> <destination>')
    .description('Get puzzle input for the specified year, day and part')
    .action((yearDayPart: string, destination: string) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getInput(yearDayPart, destination);
    });

  return getCommand;
}
