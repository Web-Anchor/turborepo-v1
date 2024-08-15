import useSWR from 'swr';
import { postFetcher } from '.';
import { StripePaymentLink } from '../types';

type Props = {
  id?: string;
  links?: StripePaymentLink[];
};

export function usePaymentLinks(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/on-click/retrieve-payment-links`,
    (url: string) => postFetcher(url, {}),
    {
      revalidateOnFocus: true,
      fallbackData: props?.links as any,
    }
  );
  const obj = data?.data;

  return {
    data: obj,
    links: obj?.links?.data as StripePaymentLink[],
    has_more: obj?.links?.has_more,
    error,
    isLoading,
  };
}
