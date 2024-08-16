'use client';

// import TestimonialsWhiteGrid from '@app/components/TestimonialsWhiteGrid';
import { maxLength } from '@config/index';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useReCaptcha } from 'next-recaptcha-v3';
import {
  Accordion,
  Button,
  HeaderSection,
  Select,
  Wrapper,
} from '@repo/components';
import axios from 'axios';

export default function Page() {
  const [state, setState] = useState<{ fetching?: boolean }>({});
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { executeRecaptcha } = useReCaptcha();

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Validate google re-captcha
      // --------------------------------------------------------------------------------
      const token = await executeRecaptcha('form_submit');
      if (!token) {
        throw new Error('Google re-captcha validation failed');
      }

      const assessment = await axios({
        url: `/api/v1/re-captcha-validate`,
        data: { token },
      });

      if (assessment?.data?.score < 0.5) {
        throw new Error('Google re-captcha validation failed');
      }

      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const subject = form.get('subject');
      const message = form.get('message');
      const email = form.get('email-address');

      if (!subject) {
        throw new Error('Subject is required'); // Validate subject
      }

      const { data, status } = await axios({
        url: `/api/v1/support/add-ticket-public`,
        method: 'POST',
        data: { subject, message, email },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      toast.success(
        'Your message has been received. We will get back to you shortly.'
      );
      formRef.current?.reset(); // Reset form ref after successful submission
      router.push('/');
    } catch (error: any) {
      const isValidMsg = !!error.message.length;
      console.error(error.message);
      toast.error(
        isValidMsg
          ? error.message
          : 'An error occurred. Please try again later.'
      );
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
    <Wrapper className="mx-auto max-w-4xl">
      <HeaderSection
        title="Contact Us."
        description={[
          'Welcome to our contact page! We are here to assist you with any inquiries or support you may need regarding our platform for managing customer invoicing. Please feel free to reach out to us using the information provided below.',
        ]}
        type="page-header"
      />

      <form
        ref={formRef}
        className="card max-w-4xl lg:px-10 lg:py-8 bg-base-100 mx-6 lg:mx-0 lg:shadow-xl"
        onSubmit={formHandler}
      >
        <div className="space-y-12">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-col gap-5 flex-1">
              <Select
                label="Reason for contacting"
                name="subject"
                data={[
                  // 'General Inquiry',
                  // 'Technical Support',
                  // 'Billing Inquiry',
                  // 'Feature Request',
                  // 'Other',
                  { value: 1, title: 'General Inquiry' },
                  { value: 2, title: 'Technical Support' },
                  { value: 3, title: 'Billing Inquiry' },
                  { value: 4, title: 'Feature Request' },
                  { value: 5, title: 'Other' },
                ]}
              />

              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Describe subject for contacting{' '}
                  <span className="text-xs text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-5 mt-2">
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
            Submit
          </Button>
        </div>
      </form>

      <HeaderSection
        title="Frequently asked questions"
        subtitle="FAQ"
        id="facts"
      />
      <Wrapper className="mx-8">
        <Accordion
          items={[
            {
              title: 'Is the customer portal free to use?',
              body: 'Yes, the customer portal is free to use. You can access your account and manage your financial activities without any additional charges. Simply follow the link provided by your vendor to access your invoices or add it via the portals dashboard page.',
            },
            {
              title: 'How do I access my invoices?',
              body: 'To access your invoices, you can log in to your account via the customer portal. Once you are logged in, you can view your transactions, download invoices, and make any necessary adjustments. If you have any questions or need assistance, please contact your vendor for more information.',
            },
            {
              title: 'Where do I get my API key?',
              body: 'Your API key is provided by your vendor. If you do not have one, please contact your vendor to request an API key. Once you have your API key, you can use it to access your account and manage your financial activities via the customer portal.',
            },
            {
              title: 'Can I edit my invoice billing details?',
              body: 'Yes, you can edit your invoice billing details directly within the portal. This includes updating your address, contact information, and any other relevant billing details.',
            },
            {
              title: 'How secure is my financial information on the portal?',
              body: 'We take the security of your financial information very seriously. Our platform uses the authentication and security protocols to ensure that your data is safe and secure.',
            },
            {
              title: 'What if I have multiple vendors using the platform?',
              body: 'You can easily manage invoices from multiple vendors within the same portal. Each vendor will provide you with a unique API key or link to access their specific invoices.',
            },
            {
              title: 'How do I download my invoices?',
              body: 'You can download your invoices directly from the portal. Simply navigate to the invoice section and select the invoices you wish to download. You can then choose to download them as a PDF file for your records. If you have any questions or need assistance, please contact your vendor for more information.',
            },
            {
              title: 'Can I track my transactions on the portal?',
              body: 'Yes, the portal allows you to track all your transactions in real-time. You can view the status of your invoices and payments at any time. This makes it easy to stay up-to-date on your financial activities and manage your records effectively.',
            },
            {
              title: 'How do I get support if I encounter an issue?',
              body: 'Our support team is available to assist you with any issues you may encounter. You can reach out to us via the contact information provided within the portal. We are here to help you with any questions or concerns you may have.',
            },
            {
              title: 'Can I customize my invoices?',
              body: "While you can edit billing details, customization options for the invoice layout itself may be limited based on the vendor's settings. Please check with your vendor for specific customization options.",
            },
            {
              title: 'Do I need to download any software to use the portal?',
              body: 'No, there is no need to download any software. The portal is web-based and can be accessed from any device with an internet connection. Simply follow the link provided by your vendor to get started.',
            },
            // More questions...
          ]}
        />
      </Wrapper>
      {/* <TestimonialsWhiteGrid /> */}
    </Wrapper>
  );
}
