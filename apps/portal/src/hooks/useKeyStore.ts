import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { isString, setToLocalStorage } from '@repo/lib';

export function useKeyStore() {
  const searchParams = useSearchParams()!;
  const id = searchParams.get('id')!;

  useEffect(() => {
    /**
     * @description Key sync hook
     * @date 2024-08-14
     * @author Ed Ancerys
     */

    if (isString(id)) {
      setToLocalStorage(process.env.NEXT_PUBLIC_APP_URL!, {
        id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { id };
}
