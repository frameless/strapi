export const showErrorBasedOnENV = (message: string) => {
  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test' ||
    process.env['DEBUG'] === 'true'
  )
    throw new Error(message);
  return undefined;
};
