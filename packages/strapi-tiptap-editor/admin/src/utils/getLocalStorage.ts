// TODO: create @frameless/utils and move this function there
/**
 * Get value from local storage
 * @param key
 * @returns value or null
 * @example
 * const value = getLocalStorage<string>('key');
 */
export const getLocalStorage = <T>(key: string, typeGuard: (arg: any) => arg is T): T | null => {
  if (!key) return null;
  if (typeof window === 'undefined') return null;
  let value: unknown = null;
  try {
    value = localStorage.getItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error parsing local storage value:', error);
    return null;
  }

  if (typeGuard(value)) {
    return value;
  } else {
    return null;
  }
};
