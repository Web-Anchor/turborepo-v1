'use client';

import { useBuildTemplate } from '@hooks/useTemplates';
import { Wrapper, LoadingDots, HeaderSection } from '@repo/components';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;
  const { html, isLoading } = useBuildTemplate({ id });
  //  Minimum width = 1200 pixels * 0.707 ≈ 848 pixels

  return (
    <Wrapper>
      {isLoading && <LoadingDots />}
      {!isLoading && html && (
        <div
          className={`w-full h-full max-w-4xl mx-auto p-4 min-h-[1200px] min-w-[848px]`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {!html && !isLoading && (
        <HeaderSection
          title="Invoice Template Not Found"
          description="No template found for the selected invoice. Please save the template to view it here."
          subtitle="Create, Save, and Preview Your Invoice Template."
          type="page-header"
        />
      )}
    </Wrapper>
  );
}
