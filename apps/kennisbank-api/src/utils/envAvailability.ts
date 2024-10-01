interface EnvValidator {
  env: any;
  keys: string[];
}
export const envAvailability = ({ env, keys }: EnvValidator) => {
  keys?.forEach((key: string) => {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
};
