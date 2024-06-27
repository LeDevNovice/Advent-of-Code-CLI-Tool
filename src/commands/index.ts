import { Command } from 'commander';

import { createGetCommand } from './get';

export function registerCommands(program: Command): void {
  program.addCommand(createGetCommand());
}
