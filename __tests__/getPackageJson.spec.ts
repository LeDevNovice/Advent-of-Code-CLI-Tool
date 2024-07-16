// utils.test.ts
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getPackageJsonPath, getPackageJson } from '../src/utils/getPackageJson';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('getPackageJsonPath', () => {
  it('should return the correct package.json path', () => {
    const mockImportMetaUrl = `file://${__filename}`;
    const expectedPath = path.resolve(
      path.dirname(fileURLToPath(new URL(mockImportMetaUrl))),
      './package.json',
    );

    const result = getPackageJsonPath(mockImportMetaUrl);

    expect(result).toBe(expectedPath);
  });
});

describe('getPackageJson', () => {
  it('should read and parse package.json correctly', () => {
    const mockImportMetaUrl = `file://${__filename}`;
    const mockPackageJson = { version: '1.0.0' };
    const mockPackageJsonPath = path.resolve(
      path.dirname(fileURLToPath(new URL(mockImportMetaUrl))),
      './package.json',
    );

    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockPackageJson));

    const result = getPackageJson(mockImportMetaUrl);

    expect(fs.readFileSync).toHaveBeenCalledWith(mockPackageJsonPath, 'utf8');
    expect(result).toEqual(mockPackageJson);
  });

  it('should throw an error if package.json cannot be read', () => {
    const mockImportMetaUrl = `file://${__filename}`;
    const mockPackageJsonPath = path.resolve(
      path.dirname(fileURLToPath(new URL(mockImportMetaUrl))),
      './package.json',
    );

    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to read file');
    });

    expect(() => getPackageJson(mockImportMetaUrl)).toThrow('Failed to read file');
    expect(fs.readFileSync).toHaveBeenCalledWith(mockPackageJsonPath, 'utf8');
  });
});
