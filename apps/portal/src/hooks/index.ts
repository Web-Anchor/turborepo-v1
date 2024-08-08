import axios from 'axios';

// --------------------------------------------------------------------------------
// 📌  SWR fetchers
// --------------------------------------------------------------------------------
export async function getFetcher(url: string) {
  return await axios.get(url);
}

export function postFetcher(url: string, body?: any) {
  return axios.post(url, body || {});
}

export * from './useCharges';
export * from './useTestimonials';
export * from './useSupportTickets';
export * from './useTemplates';
