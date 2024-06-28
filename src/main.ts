import { program } from 'commander';

import { registerCommands } from './commands';

program.version('1.0.0');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
registerCommands(program);
program.parse(process.argv);
