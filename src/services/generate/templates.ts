import { TemplateKey } from './templateKey.type';

export const templates: Record<TemplateKey, string> = {
  ts: `export function solvePuzzle(input: string): any {
  // Implement your solution here
  return;
}`,
  js: `function solvePuzzle(input) {
  // Implement your solution here
  return;
}

module.exports = solvePuzzle;`,
};
