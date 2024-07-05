import { Command } from 'commander';

import { createGetCommand } from './get';
import { createGenerateCommand } from './generate';

export function registerCommands(program: Command): void {
  program.addCommand(createGetCommand());
  program.addCommand(createGenerateCommand());
}
