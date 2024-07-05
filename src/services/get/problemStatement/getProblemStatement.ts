import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

import { FetchOptions } from '@interfaces/fetchOptions.interface';
import { ensureDirectoryExists } from '@utils/ensureDirectoryExists';
import { getHtmlContent } from '@utils/getHtmlContent';
import { convertToMarkdown } from '@utils/convertToMarkdown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPath });

const AOC_COOKIE = process.env.AOC_COOKIE;

export async function getProblemStatement(yearDay: string, destination: string): Promise<void> {
  const [year, day] = yearDay.split('-').map(Number);
  const problemStatementPath = path.join(destination, 'problemStatement.md');

  const options: FetchOptions = {
    headers: {
      'cookie': `session=${AOC_COOKIE}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  console.log(
    `Fetching problem statement for puzzle day ${day} in ${year} version of Advent of Code...`,
  );

  try {
    await ensureDirectoryExists(destination);

    const problemStatementHtml = await getHtmlContent(year, day, options);
    const problemStatementMarkdown = convertToMarkdown(problemStatementHtml);

    await fs.writeFile(problemStatementPath, problemStatementMarkdown);
    console.log(`Problem statement saved to ${problemStatementPath}`);
  } catch (error) {
    console.error('Error fetching or saving problem statement:', error);
  }
}
