import { AuthWrapper } from '@components/AuthWrapper';
import Controller from './controller';

export default async function Page() {
  return (
    <AuthWrapper>
      <Controller />
    </AuthWrapper>
  );
}
