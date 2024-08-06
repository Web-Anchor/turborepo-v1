'use client';

import Wrapper from '@app/components/Wrapper';
import { Spinner } from '@app/components/Skeleton';
import { useBuildChargeTemplate } from '@hooks/useTemplates';
import { useSearchParams } from 'next/navigation';
import PageHeadings from '@app/components/PageHeadings';
import parse from 'html-react-parser';
import { useState } from 'react';
import axios from 'axios';
import {
  classNames,
  downloadFile,
  stripeAmountToCurrency,
} from '@helpers/index';
import { toast } from 'sonner';
import { Template } from '@appTypes/index';
import Button from '@app/components/Button';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import Link from '@app/components/Link';

const ParsedContent = (props: { html?: string }) => {
  const parsedHtml = parse(props?.html ?? '', {
    replace: (domNode) => {
      if (
        domNode.type === 'tag' &&
        domNode.name === 'p' &&
        domNode.attribs['data-input']
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
    },
  });

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-4 min-h-[1200px] min-w-[848px]">
      {parsedHtml}
    </div>
  );
};

export default function Page() {
  const [state, setState] = useState<{ fetching?: boolean }>({});
  const searchParams = useSearchParams();

  const id = searchParams.get('id')!;
  const chargeid = searchParams.get('chargeid')!;

  const { html, isLoading, charge } = useBuildChargeTemplate({ id, chargeid });
  const bodyContent = extractBodyContent(html);
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
      <Spinner hidden={!isLoading} />
      {!isLoading && html && (
        <form
          className="flex flex-col items-center justify-center w-full h-full"
          onSubmit={submit}
        >
          {/* <div
            className={`w-full h-full max-w-4xl mx-auto p-4 min-h-[1200px] min-w-[848px]`}
            dangerouslySetInnerHTML={{ __html: html }}
          /> */}
          <ParsedContent html={bodyContent} />
          <section className="flex w-full flex-row gap-2 justify-center my-10">
            <Button fetching={state?.fetching} type="submit">
              <section className="flex flex-row gap-2">
                <CloudArrowDownIcon className="h-5 w-5" />
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
        <PageHeadings
          title="Invoice Template Not Found"
          description="No template found for the selected invoice. Please save the template to view it here."
          slogan="Create, Save, and Preview Your Invoice Template."
        />
      )}
    </Wrapper>
  );
}

function extractBodyContent(html?: string) {
  return (html ?? '').match(/<body[^>]*>([\s\S.]*)<\/body>/i)?.[1];
}
