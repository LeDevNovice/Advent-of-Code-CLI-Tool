import { promises as fs } from 'fs';
import { ensureDirectoryExists } from '../src/utils/ensureDirectoryExists';

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
  },
}));

const mockMkdir = fs.mkdir as jest.Mock;

describe('ensureDirectoryExists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create the directory if it does not exist', async () => {
    mockMkdir.mockResolvedValue(undefined);

    await expect(ensureDirectoryExists('path/to/directory')).resolves.not.toThrow();

    expect(mockMkdir).toHaveBeenCalledWith('path/to/directory', { recursive: true });
  });

  it('should not throw an error if the directory already exists', async () => {
    const error = new Error('EEXIST: file already exists') as NodeJS.ErrnoException;
    error.code = 'EEXIST';
    mockMkdir.mockRejectedValue(error);

    await expect(ensureDirectoryExists('path/to/directory')).resolves.not.toThrow();

    expect(mockMkdir).toHaveBeenCalledWith('path/to/directory', { recursive: true });
  });

  it('should throw an error if mkdir fails with an error other than EEXIST', async () => {
    const error = new Error('EACCES: permission denied') as NodeJS.ErrnoException;
    error.code = 'EACCES';
    mockMkdir.mockRejectedValue(error);

    await expect(ensureDirectoryExists('path/to/directory')).rejects.toThrow(
      'Failed to create directory path/to/directory: EACCES: permission denied',
    );

    expect(mockMkdir).toHaveBeenCalledWith('path/to/directory', { recursive: true });
  });
});
