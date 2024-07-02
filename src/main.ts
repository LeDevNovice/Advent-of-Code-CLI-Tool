#!/usr/bin/env node

import { program } from 'commander';

import { registerCommands } from './commands/index';

program.version('1.0.0');
registerCommands(program);
program.parse(process.argv);
