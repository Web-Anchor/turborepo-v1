'use client';

import Wrapper from '@app/components/Wrapper';
import PageHeadings from '@app/components/PageHeadings';
import { useCharges } from '@hooks/useCharges';
import { useSearchParams } from 'next/navigation';
import KeyCard from '@app/components/KeyCard';

export default function Page() {
  const searchParams = useSearchParams()!;

  const id = searchParams.get('id')!;

  const { charges, data, isLoading, isValidKey } = useCharges({
    id,
  });
  console.log('🚧 Charge Data', charges, data, isLoading, isValidKey);

  return (
    <Wrapper>
      <PageHeadings
        title="Settings. Add or update Your API Key"
        description="To enable access for your invoices, please provide your unique API key provided by the vendor. If you have not received one from your vendor, kindly reach out to the company where you made your purchase for assistance."
        slogan="Manage your services with ease!"
      />

      <KeyCard
        apiKey={id}
        isValid={isValidKey}
        isLoading={isLoading}
        path={`/dashboard/settings`}
      />
    </Wrapper>
  );
}
