import fs from 'node:fs';

export const readFile = (filePath: string) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return undefined;
  }
};
