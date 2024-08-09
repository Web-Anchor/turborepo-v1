'use client';

import { UserProfile } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import { Skeleton, Wrapper } from '@repo/components';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log('👤 User ', user);

  if (!isLoaded) {
    return (
      <>
        <Skeleton type="card" />
      </>
    );
  }

  return (
    <Wrapper className="profile-wrapper">
      <UserProfile
        appearance={{
          elements: { pageScrollBox: { boxShadow: 'none' } },
        }}
      />
    </Wrapper>
  );
}
