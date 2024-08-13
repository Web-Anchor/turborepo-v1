'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCharges } from '@hooks/index';
import { Charge, Template } from '@tsTypes/index';
import Link from '@components/Link';
import axios from 'axios';
import { toast } from 'sonner';
import { KeyCard } from '@components/KeyCard';
import {
  HeaderSection,
  Wrapper,
  Button,
  MediaScreenTitle,
  Table,
} from '@repo/components';
import RateForm from '@components/RateForm';
import {
  getFromLocalStorage,
  getTimeAgo,
  isString,
  stripeAmountToCurrency,
} from '@repo/lib';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const [state, setState] = useState<{
    fetching?: boolean;
    fetchInvoice?: string;
    charges?: Charge[];
    has_more?: boolean;
    has_previous?: boolean;
  }>({});
  const id = searchParams.get('id')!;
  const starting_after = searchParams.get('starting_after')!;
  const ending_before = searchParams.get('ending_before')!;

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 📌  Session storage sync
    // --------------------------------------------------------------------------------
    const storage = getFromLocalStorage(process.env.NEXT_PUBLIC_APP_URL!);

    if (!isString(id) && storage) {
      console.log('🚧 Redirecting to dashboard with stored id', storage);

      router.push(`/dashboard?id=${storage?.id}`); // 🚧 add api key form storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { charges, data, isLoading, isValidKey } = useCharges({
    id,
    starting_after,
    ending_before,
  });
  const response = state?.charges || charges;
  const hasMoreRes = state?.has_more ?? data?.has_more;
  const hasPreviousRes = state?.has_previous ?? data?.has_previous;
  console.log('🚧 Charge Data', charges);

  async function nexPage() {
    try {
      setState((prev) => ({ ...prev, fetching: true }));
      const starting_after = response?.[charges?.length - 1]?.id;
      const { data } = await axios.post('/api/v1/stripe/charges', {
        id,
        starting_after,
      });
      router.push(`/dashboard?id=${id}&starting_after=${starting_after}`);
      console.log('🚧 ✅ Charges', data);

      setState((prev) => ({
        ...prev,
        charges: data?.charges?.data,
        has_more: data?.charges?.has_more,
        has_previous: data?.charges?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function prevPage() {
    try {
      setState((prev) => ({ ...prev, fetching: true }));
      const ending_before = response?.[0]?.id;
      const { data } = await axios.post('/api/v1/stripe/charges', {
        id,
        ending_before,
      });
      router.push(`/dashboard?id=${id}&ending_before=${ending_before}`);

      setState((prev) => ({
        ...prev,
        charges: data?.charges?.data,
        has_more: data?.charges?.has_more,
        has_previous: data?.charges?.has_previous,
      }));
    } catch (error: any) {
      console.error('🔑 error', error);
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function downloadPDF(id: string) {
    const startTime = new Date().getTime(); // 🕰 Start time
    try {
      setState((prev) => ({ ...prev, fetchInvoice: id }));
      const charge = charges?.find((charge) => charge.id === id);

      const invoiceData: Template = {
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
      };

      const { data, status } = await callApiWithRetry({ id, invoiceData });

      if (data && status === 200) {
        // const pdfBlob = await new Blob([Buffer.from(data, 'base64')]);
        const pdfBlob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `template_sample_${
          new Date().toISOString().split('T')[1]
        }.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast?.success(`Document downloaded successfully!`);
      } else {
        toast?.error('An error occurred while generating the document.');
      }
    } catch (error: any) {
      console.log('🚨 error', error);
      const totalTime = new Date().getTime() - startTime; // 🕰 End time
      const msg = 'An error occurred while downloading the document.';

      toast?.error(`${msg} Executed in: ${totalTime}ms`);
    } finally {
      setState((prev) => ({ ...prev, fetchInvoice: undefined }));
    }
  }

  async function callApiWithRetry(props: {
    id: string;
    invoiceData: Template;
  }) {
    const MAX_RETRIES = 3;
    const RETRY_INTERVAL = 2000; // delay between retries in ms
    let retries = 0;

    async function attempt(): Promise<{ data?: any; status?: any }> {
      try {
        const { data, status } = await axios.post(
          '/api/v2/generate-pdf',
          {
            invoiceData: props.invoiceData,
            id: searchParams.get('id')!,
          }, // 🚧 POST request with body required
          { responseType: 'blob' }
        );

        return { data, status };
      } catch (error) {
        if (retries < MAX_RETRIES) {
          retries++;
          console.log(`Retrying API call (${retries}/${MAX_RETRIES})...`);
          console.log('🚨 error', (error as Error)?.message);

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              attempt().then(resolve).catch(reject);
            }, RETRY_INTERVAL);
          });
        } else {
          console.error('Max retries reached. Unable to call API.');
          throw new Error('Max retries reached. Unable to call API.');
        }
      }
    }

    return attempt();
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Dashboard. Your Central Hub for Insights and Control."
        description={[
          'Access real-time data, analytics, and key metrics on our Dashboard, empowering you with valuable insights to make informed decisions. Monitor performance, track trends, and stay in control of your operations from a centralized platform designed to streamline your workflow.',
        ]}
        subtitle="Invoice Smarter, Grow Stronger - Empowering Your Business!"
        type="page-header"
      />

      {!isValidKey && (
        <KeyCard
          apiKey={id}
          isValid={isValidKey}
          isLoading={isLoading}
          link="/dashboard/settings"
        />
      )}

      <Table
        header={[
          { item: 'Name', className: 'hidden md:table-cell' },
          { item: 'Description' },
          { item: 'Amount' },
          { item: 'Currency', className: 'hidden md:table-cell' },
          {
            item: 'Created At',
            className: 'truncate hidden w-12 md:table-cell',
          },
          { item: 'Receipt' },
          { item: 'Preview' },
          { item: 'Invoice' },
        ]}
        data={response?.map((item: Charge) => {
          return {
            row: [
              {
                item: (
                  <p className="max-w-24 md:max-w-none truncate">
                    {item?.customer?.name}
                  </p>
                ),
                class: 'hidden md:table-cell',
              },
              {
                item: (
                  <p className="max-w-24 md:max-w-none truncate">
                    {item?.description}
                  </p>
                ),
              },
              {
                item: (
                  <p>{stripeAmountToCurrency(item?.amount, item?.currency!)}</p>
                ),
              },
              {
                item: <p>{item?.currency}</p>,
                class: 'hidden md:table-cell',
              },
              {
                item: (
                  <p className="truncate ">
                    {getTimeAgo(item?.created! * 1000)}
                  </p>
                ),
                class: 'hidden md:table-cell text-nowrap',
              },
              {
                item: (
                  <Link href={item?.receipt_url!} target="_blank">
                    Receipt
                  </Link>
                ),
              },
              {
                item: (
                  <Link
                    href={`/dashboard/template-preview`}
                    chargeid={item?.id}
                  >
                    <MediaScreenTitle large="Preview & Edit" small="Preview" />
                  </Link>
                ),
              },
              {
                item: (
                  <Button
                    onClick={() => downloadPDF(item?.id!)}
                    fetching={state?.fetchInvoice === item?.id!}
                    style="link"
                  >
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
                          stroke="#4F46E5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{' '}
                        <path
                          d="M16 17H12H8"
                          stroke="#4F46E5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{' '}
                        <path
                          d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                          stroke="#4F46E5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{' '}
                      </g>
                    </svg>
                  </Button>
                ),
              },
            ],
          };
        })}
        hasMore={hasMoreRes}
        hasPrevious={hasPreviousRes}
        prevCallback={prevPage}
        nextCallback={nexPage}
        fetching={isLoading}
        hidden={!isValidKey}
      />

      {isValidKey && <RateForm />}
    </Wrapper>
  );
}

export async function saveBlob({ blob, name }: { blob: Blob; name: string }) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.target = '_blank'; // Open pdf in new tab
  a.click();

  window.URL.revokeObjectURL(url);
}
