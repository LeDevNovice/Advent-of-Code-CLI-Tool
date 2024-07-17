import * as path from 'path';
import { promises as fs } from 'fs';

import { ensureDirectoryExists } from '@utils/ensureDirectoryExists';

export async function generateTemplate(destination: string): Promise<void> {
  const templateContent = `export function solvePuzzle(input) {
  // Implement your solution here
  return;
}`;
  const fileName = 'solvePuzzle.js';
  const filePath = path.join(destination, fileName);

  try {
    await ensureDirectoryExists(destination);
    await fs.writeFile(filePath, templateContent);
    console.log(`Template created at ${filePath}`);
  } catch (error) {
    console.error('Error creating template:', error);
  }
}
