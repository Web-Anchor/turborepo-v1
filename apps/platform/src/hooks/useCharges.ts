import useSWR from 'swr';
import { postFetcher } from '.';
import { Charge } from '../types';

type Props = {
  id?: string;
  charges?: Charge[];
  starting_after?: string;
  ending_before?: string;
};

export function useCharges(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/charges?account=${props.id}`,
    (url: string) =>
      postFetcher(url, {
        id: props.id,
        starting_after: props.starting_after,
        ending_before: props.ending_before,
      }),
    {
      revalidateOnFocus: true,
      fallbackData: props?.charges as any,
    }
  );
  const obj = data?.data?.charges;

  return {
    data: obj,
    charges: obj?.data as Charge[],
    has_more: obj?.has_more,
    has_previous: obj?.has_previous,
    isValidKey: data?.data?.isValidKey as boolean,
    error,
    isLoading,
  };
}
