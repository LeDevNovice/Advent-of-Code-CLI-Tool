import * as https from 'https';

const AOC_URL = 'https://adventofcode.com';

export async function getHtmlContent(year: number, day: number, options: any): Promise<string> {
  const url = `${AOC_URL}/${year}/day/${day}`;

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
