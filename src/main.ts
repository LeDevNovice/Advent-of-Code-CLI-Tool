#!/usr/bin/env node
import * as fs from 'fs';
import { program } from 'commander';

import { registerCommands } from '@commands/index';

const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

program.version(packageJson.version);
registerCommands(program);
program.parse(process.argv);
