import { Command } from 'commander';

import { generateTemplate } from '@services/generate/generateTemplate';

export function createGenerateCommand(): Command {
  const generateCommand = new Command('generate').description(
    'Generate template solution function in JavaScript',
  );

  generateCommand
    .command('template <destination>')
    .description('Generate a template solution function in JavaScript')
    .action(async (destination: string) => {
      await generateTemplate(destination);
    });

  return generateCommand;
}
