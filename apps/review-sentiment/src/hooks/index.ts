import axios from 'axios';

/**
 * @description SWR hook exports
 * @date 2024-08-30
 * @author Ed Ancerys
 */

export async function postFetcher(url: string, body = {}) {
  const response = await axios.post(url, body);
  return response.data;
}

// --------------------------------------------------------------------------------
// 📌  Default exports
// --------------------------------------------------------------------------------
export * from './useTester';
