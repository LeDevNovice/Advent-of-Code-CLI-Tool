#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
import { fileURLToPath } from 'url';

import { registerCommands } from '@commands/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, './package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

program.version(packageJson.version);
registerCommands(program);
program.parse(process.argv);
