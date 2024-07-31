type StoredValue = Record<string, unknown> | null;

/**
 * Combines the given class names into a single string.
 * @param classes - The class names to combine.
 * @returns The combined class names.
 */
export function getFromLocalStorage<T extends StoredValue = StoredValue>(
  key: string,
  defaultValue: T = {} as T
): T {
  try {
    if (typeof window === 'undefined') {
      throw new Error('Local storage is not available on the server');
    }

    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(
      `Error getting item from local storage: ${(error as Error).message}`
    );
    return defaultValue;
  }
}

/**
 * Checks if the given value is a string.
 * @param value - The value to check.
 * @returns `true` if the value is a string, otherwise `false`.
 */
export function isString(value: unknown): boolean {
  return typeof value === 'string';
}
