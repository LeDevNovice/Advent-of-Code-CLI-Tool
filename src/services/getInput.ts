import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import { FetchOptions } from '../interfaces/fetchOptions.interface';
import { ensureDirectoryExists } from '../utils/ensureDirectoryExists';

const writeFileAsync = promisify(fs.writeFile);

export async function getInput(yearDayPart: string, destination: string): Promise<void> {
  const [year, day, part] = yearDayPart.split('-').map(Number);
  const inputPath = path.join(destination, 'input.md');

  const options: FetchOptions = {
    headers: {
      'cookie': `session=${AOC_COOKIE}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  console.log(
    `Fetching input for part ${part} of puzzle day ${day} in ${year} version of Advent of Code...`,
  );

  try {
    await ensureDirectoryExists(destination);
    const input = await fetchInput(year, day, options);
    await writeFileAsync(inputPath, input);
    console.log(`Input retieved and saved to ${inputPath}`);
  } catch (error) {
    console.error('Error fetching or saving puzzle input : ', error);
  }
}
