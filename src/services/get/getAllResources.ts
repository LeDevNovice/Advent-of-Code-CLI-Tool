import { getInput } from './input/getInput';
import { getProblemStatement } from './problemStatement/getProblemStatement';

export async function getAllResources(yearDay: string, destination: string) {
  await getInput(yearDay, destination);
  await getProblemStatement(yearDay, destination);
}
