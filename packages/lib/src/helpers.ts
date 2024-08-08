import { formatDistanceToNow } from 'date-fns';

type StoredValue = Record<string, unknown> | null;

/**
 * @description Combines the given class names into a single string.
 * @date 2024-08-05
 * @author Ed Ancerys
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

export function setToLocalStorage<T extends StoredValue = StoredValue>(
  key: string,
  value: T
): void {
  try {
    if (typeof window === 'undefined') {
      throw new Error('Local storage is not available on the server');
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(
      `Error setting item to local storage: ${(error as Error).message}`
    );
  }
}

/**
 * Checks if the given value is a string.
 * @param value - The value to check.
 * @returns `true` if the value is a string, otherwise `false`.
 */
export function isString(value: unknown): boolean {
  return (
    typeof value === 'string' &&
    value.trim() !== '' &&
    value !== 'undefined' &&
    value !== 'null'
  );
}

export function getTimeAgo(dateString?: string | number): string {
  try {
    if (!dateString) {
      throw new Error('Date string is required');
    }

    return formatDistanceToNow(dateString, {
      addSuffix: true,
      includeSeconds: true,
    });
  } catch (error) {
    console.error('Error getting time ago:', error);
    return '';
  }
}

export function stripeAmountToCurrency(amount?: number, currency?: string) {
  if (!amount) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'usd',
  }).format(amount / 100);
}
