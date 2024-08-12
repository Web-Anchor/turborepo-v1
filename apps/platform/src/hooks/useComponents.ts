import useSWR from 'swr';
import { postFetcher } from '.';
import { Component } from '@tsTypes/index';

type Props = {
  components?: Component[];
};

export function useComponents(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/components/components`,
    (url: string) => postFetcher(url, {}),
    {
      revalidateOnFocus: true,
    }
  );
  const obj = data?.data;

  return {
    data: obj,
    components: obj?.components as Component[],
    count: obj?.components?.length,
    error,
    isLoading,
  };
}
