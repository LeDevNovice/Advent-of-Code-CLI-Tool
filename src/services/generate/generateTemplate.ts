import * as path from 'path';
import { promises as fs } from 'fs';

import { ensureDirectoryExists } from '@utils/ensureDirectoryExists';
import { templates } from './templates';
import { TemplateKey } from './templateKey.type';

export async function generateTemplate(destination: string, template: TemplateKey): Promise<void> {
  const templateContent = templates[template] || templates['ts'];
  const fileExtension = template === 'js' ? 'js' : 'ts';
  const fileName = `solvePuzzle.${fileExtension}`;
  const filePath = path.join(destination, fileName);

  try {
    await ensureDirectoryExists(destination);
    await fs.writeFile(filePath, templateContent);
    console.log(`Template created at ${filePath}`);
  } catch (error) {
    console.error('Error creating template:', error);
  }
}
