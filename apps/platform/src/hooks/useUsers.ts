import useSWR from 'swr';
import { postFetcher } from '.';
import { User } from '../types';

type Props = {
  user?: User;
};

export function useUser(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/user`,
    (url: string) => postFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.user as any,
    }
  );

  return {
    user: data?.data?.user as User,
    error,
    isLoading,
  };
}
