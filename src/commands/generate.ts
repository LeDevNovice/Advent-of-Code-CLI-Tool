import { Command } from 'commander';

export function createGenerateCommand(): Command {
  const generateCommand = new Command('generate').description(
    'Generate template solution function in various languages',
  );

  return generateCommand;
}
