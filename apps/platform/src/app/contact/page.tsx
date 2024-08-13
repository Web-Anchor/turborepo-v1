import { Wrapper } from '@repo/components';
import Header from '@app/header';
import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';
import Controller from './controller';

export default async function Page(params: { searchParams: { id: string } }) {
  return (
    <GoogleCaptchaWrapper>
      <Wrapper className="h-full pt-24 lg:pt-36">
        <Header />
        <Controller />
      </Wrapper>
    </GoogleCaptchaWrapper>
  );
}
