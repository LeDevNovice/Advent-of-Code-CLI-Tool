import * as path from 'path';
import * as dotenv from 'dotenv';
import * as https from 'https';
import { fileURLToPath, pathToFileURL } from 'url';

import { fetchInput } from '@services/get/input/fetchInput';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPath });

const AOC_COOKIE = process.env.AOC_COOKIE;

const fetchOptions = {
  headers: {
    'cookie': `session=${AOC_COOKIE}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export async function submitAnswer(yearDay: string, solutionPath: string, functionName: string) {
  const [year, day] = yearDay.split('-').map(Number);

  console.log(`Submitting answer for ${year} Day ${day}...`);

  try {
    const solutionUrl = pathToFileURL(path.resolve(solutionPath)).href;
    const solutionModule = await import(solutionUrl);
    const solutionFunction = solutionModule[functionName];

    if (typeof solutionFunction !== 'function') {
      throw new Error(`Function ${functionName} not found in ${solutionPath}`);
    }

    const input = await fetchInput(year, day, fetchOptions);
    const answer = solutionFunction(input.trim());

    await submit(year, day, answer);
  } catch (error) {
    console.error('Error during submission:', error);
  }
}

async function submit(year: number, day: number, answer: string) {
  const postData = new URLSearchParams({
    level: '1', // Assuming part 1 for simplicity, this can be extended
    answer: answer.toString(),
  }).toString();

  const options = {
    hostname: 'adventofcode.com',
    path: `/${year}/day/${day}/answer`,
    method: 'POST',
    headers: {
      ...fetchOptions.headers,
      'Content-Length': postData.length,
    },
  };

  return new Promise<void>((resolve, reject) => {
    const req = https.request(options, (res) => {
      let response = '';

      res.on('data', (chunk: any) => {
        response += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          if (response.includes('You gave an answer too recently')) {
            console.log('You gave an answer too recently');
          } else if (response.includes('not the right answer')) {
            if (response.includes('too high')) {
              console.log('Too high!');
            } else if (response.includes('too low')) {
              console.log('Too low!');
            } else {
              console.log('Not the right answer...');
            }
          } else if (response.includes('seem to be solving the right level.')) {
            console.log('Already solved this level');
          } else {
            console.log('⭐️ Success, congrats! ⭐️');
          }
          resolve();
        } else {
          reject(new Error(`Failed to submit: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}
