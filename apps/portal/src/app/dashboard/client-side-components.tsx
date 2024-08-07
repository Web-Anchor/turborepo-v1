'use client';

import { useUser } from '@clerk/nextjs';
/**
 * @description Client side components for the dashboard page
 * @date 2024-08-07
 * @author Ed Ancerys
 */

import ProfileButton from '@components/ProfileButton';

export function ProfileButtonWrapper() {
  let { isSignedIn, user, isLoaded } = useUser();

  return (
    <ProfileButton
      href="/dashboard"
      name={`${user?.firstName} ${user?.lastName}`}
      imgSrc={user?.imageUrl}
      className="mb-4"
    />
  );
}
