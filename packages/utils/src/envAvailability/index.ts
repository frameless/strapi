interface EnvValidator {
  env: { [key: string]: string | undefined };
  keys: string[];
}

export const envAvailability = ({ env, keys }: EnvValidator): void => {
  if (!Array.isArray(keys) || keys.length === 0) return; // No keys to validate

  const missingKeys = keys.filter((key) => !env[key]); // Collect missing keys

  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
  }
};
