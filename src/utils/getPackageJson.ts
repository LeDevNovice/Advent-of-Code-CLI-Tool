import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export function getPackageJsonPath(importMetaUrl: string): string {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../package.json');
}

export function getPackageJson(importMetaUrl: string): Record<string, string> {
  const packageJsonPath = getPackageJsonPath(importMetaUrl);
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}
