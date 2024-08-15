import { subRouteGuard } from '@server/route-protection';
import Controller from './controller';
import { AuthWrapper } from '@components/AuthWrapper';

export default async function Page() {
  await subRouteGuard();

  return (
    <AuthWrapper>
      <Controller />
    </AuthWrapper>
  );
}
