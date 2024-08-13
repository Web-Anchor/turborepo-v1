'use client';

import { useClerk } from '@clerk/nextjs';
import { useCharges } from '@hooks/useCharges';
import { Button, HeaderSection, Wrapper } from '@repo/components';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams()!;

  const id = searchParams.get('id')!;

  const { charges, data, isLoading, isValidKey } = useCharges({
    id,
  });
  const { signOut } = useClerk();
  console.log('🚧 Charge Data', charges, data, isLoading, isValidKey);

  function signOutUser(e: { preventDefault: () => void }) {
    // --------------------------------------------------------------------------------
    // 📌 Sign Out User from current session
    // --------------------------------------------------------------------------------

    signOut();
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Settings & Configurations"
        description={[]}
        subtitle="Manage your services with ease!"
        type="page-header"
      />
      <Button
        title="Sign out 😢"
        style="primary"
        onClick={signOutUser}
        className="w-fit"
      />
    </Wrapper>
  );
}
