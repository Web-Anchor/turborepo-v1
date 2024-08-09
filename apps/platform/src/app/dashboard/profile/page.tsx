import Controller from './controller';
import { AuthWrapper } from '@components/AuthWrapper';

export default async function Page() {
  return (
    <AuthWrapper>
      <Controller />
    </AuthWrapper>
  );
}
