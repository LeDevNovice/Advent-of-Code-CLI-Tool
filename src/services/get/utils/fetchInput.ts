import * as https from 'https';

import { FetchOptions } from '../../../interfaces/fetchOptions.interface';

const AOC_URL = 'https://adventofcode.com';

export async function fetchInput(year: number, day: number, options: FetchOptions) {
  const url = `${AOC_URL}/${year}/day/${day}/input`;

  return new Promise<string>((resolve, reject) => {
    https
      .get(url, options, (res) => {
        let resBody = '';
        res.on('data', (chunk) => {
          resBody += chunk;
        });
        res.on('end', () => {
          resolve(resBody.trim());
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
