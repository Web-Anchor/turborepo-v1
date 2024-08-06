import { Wrapper } from '@repo/components';
import Header from '@app/header';
import GoogleCaptchaWrapper from './GoogleCaptchaWrapper';
import Controller from './controller';
import { components } from '@server/components';

export default async function Page(params: { searchParams: { id: string } }) {
  const data = await components({ id: params.searchParams.id });
  const company = data?.components?.find(
    (component) => component?.type === 'Company'
  );

  return (
    <GoogleCaptchaWrapper>
      <Wrapper className="h-full pt-24 lg:pt-36">
        <Header company={company} />
        <Controller />
      </Wrapper>
    </GoogleCaptchaWrapper>
  );
}
