import useSWR from 'swr';
import { postFetcher } from '.';
import { Template } from '../types';

type Props = {
  id?: string;
  account?: string;
  templates?: Template[];
};

export function useTemplates(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/templates`,
    (url: string) => postFetcher(url, { account: props.account }),
    {
      revalidateOnFocus: true,

      fallbackData: props?.templates as any,
    }
  );
  const obj = data?.data?.templates as Template[];

  return {
    templates: obj,
    count: obj?.length ?? 0,
    error: data?.data?.error || error,
    isLoading,
  };
}

export function useBuildTemplate(props: Props) {
  const { data, error, isLoading } = useSWR(
    props?.id ? `/api/v1/templates/build` : undefined,
    (url: string) => postFetcher(url, { id: props.id }),
    {
      revalidateOnFocus: true,

      fallbackData: props?.templates as any,
    }
  );
  const obj = data?.data;
  console.log('🔑 useBuildTemplate', obj);

  return {
    template: obj?.template,
    html: obj?.html,
    dbTemplate: obj?.dbTemplate,
    error: data?.data?.error || error,
    isLoading,
  };
}
