import Controller from './controller';
import { AuthWrapper } from '@components/AuthWrapper';

export default async function Page(props: { searchParams: { id: string } }) {
  return (
    <AuthWrapper>
      <Controller />
    </AuthWrapper>
  );
}
