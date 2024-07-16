import * as path from 'path';
import { promises as fs } from 'fs';

import { generateTemplate } from '../src/services/generate/generateTemplate';
import { ensureDirectoryExists } from '../src/utils/ensureDirectoryExists';

jest.mock('../src/utils/ensureDirectoryExists', () => ({
  ensureDirectoryExists: jest.fn(),
}));

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
  },
}));

describe('generateTemplate', () => {
  const destination = './test/destination';
  const fileName = 'solvePuzzle.js';
  const filePath = path.join(destination, fileName);
  const templateContent = `export function solvePuzzle(input) {
  // Implement your solution here
  return;
}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call ensureDirectoryExists with the correct destination', async () => {
    await generateTemplate(destination);

    expect(ensureDirectoryExists).toHaveBeenCalledWith(destination);
  });

  it('should write the template file to the correct path', async () => {
    await generateTemplate(destination);

    expect(fs.writeFile).toHaveBeenCalledWith(filePath, templateContent);
  });

  it('should log a success message when the template is created successfully', async () => {
    console.log = jest.fn();
    await generateTemplate(destination);

    expect(console.log).toHaveBeenCalledWith(`Template created at ${filePath}`);
  });

  it('should log an error message when an error occurs', async () => {
    const error = new Error('Test error');
    (fs.writeFile as jest.Mock).mockRejectedValueOnce(error);
    console.error = jest.fn();

    await generateTemplate(destination);

    expect(console.error).toHaveBeenCalledWith('Error creating template:', error);
  });
});
