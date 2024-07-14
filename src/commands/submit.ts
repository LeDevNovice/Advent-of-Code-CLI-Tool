import { Command } from 'commander';

import { submitAnswer } from '../services/submit/submitAnswer';

export function createSubmitCommand(): Command {
  const submitCommand = new Command('submit')
    .description('Submit the answer for the specified year, day, and part of Advent of Code puzzle')
    .argument('<yearDay>', 'Specify the year and day in the format YYYY-DD')
    .argument('<solutionPath>', 'Path to the solution file')
    .argument('<functionName>', 'Name of the function to execute')
    .action(async (yearDay: string, solutionPath: string, functionName: string) => {
      await submitAnswer(yearDay, solutionPath, functionName);
    });

  return submitCommand;
}
