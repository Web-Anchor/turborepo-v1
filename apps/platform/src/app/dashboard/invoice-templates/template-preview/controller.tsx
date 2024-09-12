'use client';

import { useBuildTemplate } from '@hooks/useTemplates';
import { Wrapper, LoadingDots, HeaderSection } from '@repo/components';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;
  const { html, isLoading } = useBuildTemplate({ id });
  console.log('🔑 Page', html);

  //  Minimum width = 1200 pixels * 0.707 ≈ 848 pixels
  // Minimum height = 1754 pixels * 0.707 ≈ 1240 pixels

  return (
    <Wrapper>
      {isLoading && (
        <Wrapper className="relative h-[calc(100vh-200px)]">
          <Wrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingDots />
          </Wrapper>
        </Wrapper>
      )}
      {!isLoading && html && (
        <div
          className={`w-full h-full max-w-4xl mx-auto p-4 min-w-[848px] min-h-[1200px]`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {!html && !isLoading && (
        <HeaderSection
          title="Invoice Template Not Found"
          description={[
            'No template found for the selected invoice. Please save the template to view it here.',
          ]}
          subtitle="Create, Save, and Preview Your Invoice Template."
          type="page-header"
        />
      )}
    </Wrapper>
  );
}
