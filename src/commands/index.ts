import { Command } from 'commander';

import { createGetCommand } from './get';
import { createGenerateCommand } from './generate';
import { createSubmitCommand } from './submit';

export function registerCommands(program: Command): void {
  program.addCommand(createGetCommand());
  program.addCommand(createGenerateCommand());
  program.addCommand(createSubmitCommand());
}
