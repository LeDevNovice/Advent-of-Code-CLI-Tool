import { Command } from 'commander';

import { generateTemplate } from '@services/generate/generateTemplate';
import { TemplateKey } from '@services/generate/templateKey.type';

export function createGenerateCommand(): Command {
  const generateCommand = new Command('generate').description(
    'Generate template solution function in various languages',
  );

  generateCommand
    .command('template <destination>')
    .description(
      'Generate a template solution function in the language specified by the user. If none specified, TypeScript by default',
    )
    .option('--template <language>', 'Specify the template language (default: ts)', 'ts')
    .action(async (destination: string, options: TemplateKey) => {
      await generateTemplate(destination, options);
    });

  return generateCommand;
}
