'use client';

import Badge from '@app/components/Badge';
import Button from '@app/components/Button';
import PageHeadings from '@app/components/PageHeadings';
import Select from '@app/components/Select';
import Wrapper from '@app/components/Wrapper';
import { maxLength } from '@config/index';
import { useSupportTickets } from '@hooks/index';
import { cFetch } from '@lib/cFetcher';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

export default function Page() {
  const [state, setState] = useState<{ fetching?: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { count, isLoading } = useSupportTickets({});
  console.log(count, isLoading);

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const subject = form.get('subject');
      const message = form.get('message');

      const { data, status, error } = await cFetch({
        url: '/api/v1/support/add-ticket',
        method: 'POST',
        data: { subject, message },
      });
      console.log('🚨 logs', data, status);

      if (status !== 200 || data?.error) {
        throw new Error(data?.error ?? error.message);
      }

      toast.success(
        'Thanks for submitting a message! We will get back to you shortly.'
      );
      mutate(`/api/v1/support/tickets`);
      formRef.current?.reset(); // Reset form ref after successful submission
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: false }));
    }
  }

  function formHandler(e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    submit(new FormData(e.currentTarget));
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Share Your Thoughts."
        description="Help us improve by sharing your feedback on our customer portal. Your insights are valuable in shaping a better experience for you and all our users."
        slogan="Your Voice Matters, We here to Listen!"
      />

      <form
        ref={formRef}
        className="card max-w-4xl lg:px-10 lg:py-8 bg-base-100 lg:shadow-xl"
        onSubmit={formHandler}
      >
        <div className="space-y-12">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2 max-w-full lg:max-w-xs">
              <h2 className="text-base font-semibold leading-7 text-gray-800">
                Feedback & bug reports
              </h2>
              <Badge
                title={count}
                description={`Ticket${count > 1 ? 's' : ''} Submitted`}
              />
              <p className="mt-1 text-sm leading-6 text-gray-600 text-justify">
                Feel free to reach out to us with any questions, concerns, or
                feedback. We appreciate your communication and look forward to
                resolving any issues promptly.
              </p>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <Select
                label="Reason for contacting"
                name="subject"
                data={[
                  { key: 1, value: 'Support' },
                  { key: 2, value: 'Feedback' },
                  { key: 3, value: 'Bug Report' },
                ]}
                required
              />

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Describe subject for contacting{' '}
                  <span className="text-xs text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    name="message"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter your message"
                    defaultValue={''}
                    maxLength={maxLength?.comment}
                    required
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-gray-600">
                  Please provide as much detail as possible so we can assist you
                  better.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button fetching={state?.fetching} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Wrapper>
  );
}
