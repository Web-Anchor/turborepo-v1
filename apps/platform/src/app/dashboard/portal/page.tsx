import { advancedSubRouteGuard } from '@server/route-protection';
import Controller from './controller';
import { AuthWrapper } from '@components/AuthWrapper';

export default async function Page() {
  await advancedSubRouteGuard();

  return (
    <AuthWrapper>
      <Controller />
    </AuthWrapper>
  );
}
