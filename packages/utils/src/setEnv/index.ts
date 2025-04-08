// This function is a utility to set environment variables during tests
export const setEnv = (key: string, value: string) => {
  Object.defineProperty(process.env, key, {
    value,
    writable: true,
  });
};
