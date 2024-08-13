'use client';

import { maxLength } from '@config/index';
import { useSupportTickets } from '@hooks/index';
import {
  Badge,
  Button,
  HeaderSection,
  Select,
  Wrapper,
} from '@repo/components';
import axios from 'axios';
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

      const { data, status } = await axios({
        url: '/api/v1/support/add-ticket',
        method: 'POST',
        data: { subject, message },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
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
      <HeaderSection
        title="Help & Support Form."
        description=" Discover our Help & Support Center, where your queries are
        prioritized, and our team is dedicated to providing prompt
        responses to ensure your needs are addressed swiftly. Rest
        assured that your tickets are handled with urgency, and we
        strive to get back to you as soon as possible to offer the
        assistance you deserve. Please fill out the form below with your inquiry, and our support team will get back to you as soon as possible. Your satisfaction is our priority, and we are committed to providing you with the help you need."
        subtitle="Your Guide to Seamless Assistance."
        type="page-header"
      />

      <form
        ref={formRef}
        className="card max-w-4xl lg:px-10 lg:py-8 lg:mb-10 lg:shadow-xl"
        onSubmit={formHandler}
      >
        <div className="space-y-12">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2 max-w-full lg:max-w-xs">
              <h2 className="text-base font-semibold leading-7 text-gray-800">
                Support Ticket
              </h2>
              <Badge title={count} description={`Tickets Submitted`} />
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
                  { value: 'support', title: 'Support' },
                  { value: 'feedback', title: 'Feedback' },
                  { value: 'bug', title: 'Bug Report' },
                  { value: 'general', title: 'General Inquiry' },
                  { value: 'other', title: 'Other' },
                ]}
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
                    className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            Submit Ticket
          </Button>
        </div>
      </form>
    </Wrapper>
  );
}
