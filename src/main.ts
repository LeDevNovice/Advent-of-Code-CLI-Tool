#!/usr/bin/env node
import { program } from 'commander';

import { registerCommands } from '@commands/index';
import { getPackageJson } from '@utils/getPackageJson';

const packageJson = getPackageJson(import.meta.url);

program.version(packageJson.version);
registerCommands(program);
program.parse(process.argv);
