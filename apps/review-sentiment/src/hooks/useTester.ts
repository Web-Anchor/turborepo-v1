import useSWR from 'swr';
import { postFetcher } from '.';

export function useTester() {
  const { data, error, isLoading } = useSWR('/api/v1/methods.json', (url) =>
    postFetcher(url, { abc: 123 })
  );

  return {
    data,
    error,
    isLoading,
  };
}
