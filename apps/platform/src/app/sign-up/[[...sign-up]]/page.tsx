import { Wrapper } from '@repo/components';
import Header from '@app/header';
import Controller from './controller';

export default async function Page(params: { searchParams: { id: string } }) {
  return (
    <Wrapper className="h-full pt-24 lg:pt-36">
      <Header />
      <Controller />
    </Wrapper>
  );
}
