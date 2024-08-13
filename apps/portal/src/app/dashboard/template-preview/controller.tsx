'use client';

import { useBuildChargeTemplate } from '@hooks/index';
import { useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import { memo, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Template } from '@tsTypes/index';
import Link from '@components/Link';
import { Button, HeaderSection, LoadingDots, Wrapper } from '@repo/components';
import { classNames, stripeAmountToCurrency } from '@repo/lib';
import { downloadFile } from '@lib/index';

// eslint-disable-next-line react/display-name
const ParsedContent = memo(({ html }: { html?: string }) => {
  const bodyContent = extractBodyContent(html);
  const head = extractHeadContent(html);

  const parsedHtml = parse(bodyContent ?? '', {
    replace: (domNode) => {
      if (
        domNode.type === 'tag' &&
        domNode.name === 'p' &&
        domNode.attribs?.['data-input']
      ) {
        const textNode = domNode.children.find(
          (child) => child.type === 'text'
        );
        const value = (textNode as unknown as Text)?.data;
        const dataInput = domNode.attribs['data-input'];

        return (
          <input
            type="text"
            className="block w-full rounded-md border-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm max-w-[50%]"
            defaultValue={value}
            name={dataInput}
          />
        );
      }
      if (
        domNode.type === 'tag' &&
        domNode.name === 'div' &&
        domNode.attribs?.class?.includes('bg-white') &&
        domNode.attribs?.class?.includes('shadow-md')
      ) {
        domNode.attribs.class = domNode.attribs.class.replace(
          'min-h-full',
          'min-h-[1200px]'
        );
        return domNode;
      }

      return undefined; // If no replacement is needed, return undefined
    },
  });

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-4 min-h-[1200px] min-w-[848px]">
      <section dangerouslySetInnerHTML={{ __html: head! }} />

      {parsedHtml}
    </div>
  );
});

export default function Page() {
  const [state, setState] = useState<{ fetching?: boolean }>({});
  const searchParams = useSearchParams();

  const id = searchParams.get('id')!;
  const chargeid = searchParams.get('chargeid')!;

  const { html, isLoading, charge } = useBuildChargeTemplate({ id, chargeid });
  //  Minimum width = 1200 pixels * 0.707 ≈ 848 pixels

  async function submit(e: any) {
    try {
      e.preventDefault();
      setState((prev) => ({ ...prev, fetching: true }));

      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      const templateData: Template = {
        invoiceNumber: charge?.id,
        date: new Date(charge?.created! * 1000).toDateString(),
        billToName: charge?.customer?.name,
        billToAddressLine1:
          charge?.billing_details?.address?.line1 ||
          charge?.customer?.address?.line1,
        billToAddressLine2:
          charge?.billing_details?.address?.line2 ||
          charge?.customer?.address?.line2,
        billToCity:
          charge?.billing_details?.address?.city ||
          charge?.customer?.address?.city,
        billToState:
          charge?.billing_details?.address?.state ||
          charge?.customer?.address?.state,
        billToCountry:
          charge?.billing_details?.address?.country ||
          charge?.customer?.address?.country,
        billToPostalCode:
          charge?.billing_details?.address?.postal_code ||
          charge?.customer?.address?.postal_code,
        items: [
          {
            description: charge?.description,
            quantity: undefined,
            units: undefined,
            amount: stripeAmountToCurrency(charge?.amount, charge?.currency!),
          },
        ],
        dueDate: undefined,
        subtotal: stripeAmountToCurrency(charge?.amount, charge?.currency!),
        tax: undefined,
        total: stripeAmountToCurrency(charge?.amount, charge?.currency!),
        ...formObject, // 🚧 user form update overwrites
      };

      const { data } = await axios.post('/api/v1/invoices/puppet-pdf-gen', {
        data: templateData,
        chargeid: id,
        clientId: searchParams.get('id')!,
      });
      const url = data?.url;

      await downloadFile({
        url,
        name: id,
        classBack: (props) => {
          console.log('🚀 Progress', props);
        },
      });

      // --------------------------------------------------------------------------------
      // 📌  Delete PDF on the server
      // --------------------------------------------------------------------------------
      const del = await axios.post('/api/v1/delete-file', {
        url,
      });
      console.log('🚮 Delete', del);

      toast?.success('Document downloaded successfully!');
    } catch (error: any) {
      console.error('🔑 error', error);

      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  return (
    <Wrapper>
      {isLoading && (
        <Wrapper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingDots />
        </Wrapper>
      )}
      {!isLoading && html && (
        <form className="flex flex-col" onSubmit={submit}>
          <ParsedContent html={html} />

          <section className="flex w-full flex-row gap-2 justify-center my-10">
            <Button fetching={state?.fetching} type="submit">
              <section className="flex flex-row gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 7L12 14M12 14L15 11M12 14L9 11"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                    <path
                      d="M16 17H12H8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{' '}
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>{' '}
                  </g>
                </svg>
                Download PDF
              </section>
            </Button>
            <Link
              href={`/dashboard`}
              className={classNames(
                'block relative rounded-md h-fit bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700',
                state.fetching && 'cursor-not-allowed opacity-50'
              )}
              onClick={(e) => {
                if (state.fetching) {
                  e.preventDefault();
                }
              }}
            >
              Back
            </Link>
          </section>
        </form>
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

function extractBodyContent(html?: string) {
  return (html ?? '').match(/<body[^>]*>([\s\S.]*)<\/body>/i)?.[1];
}

function extractHeadContent(html?: string) {
  return (html ?? '').match(/<head[^>]*>([\s\S.]*)<\/head>/i)?.[1];
}
