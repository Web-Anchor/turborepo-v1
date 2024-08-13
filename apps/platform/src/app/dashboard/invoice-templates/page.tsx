import Controller from './controller';
import { AuthWrapper } from '@components/AuthWrapper';
import { advancedSubRouteGuard } from '@server/route-protection';

export default async function Page() {
  await advancedSubRouteGuard();

  return (
    <AuthWrapper>
      <Controller />
    </AuthWrapper>
  );
}
