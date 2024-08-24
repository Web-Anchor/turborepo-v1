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

      const assessment = await axios.post(`/api/v1/re-captcha-validate`, {
        token,
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
                    className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              title: 'What is invoicio.io?',
              body: 'invoicio.io is a comprehensive invoicing and payment management platform powered by Stripe. It allows users to manage, download, and edit invoices, generate secure payment links, and access advanced financial analytics.',
            },
            {
              title: 'How do users can access invoices on the customer portal?',
              body: 'Access to the portal requires an API key. API key can be accessed via dashboard if needed. Customer Links are generated with API key by default.',
            },
            {
              title: 'Is the customer portal free to use?',
              body: 'Yes, the customer portal is free for your customers who have been granted access. There are no additional charges.',
            },
            {
              title: 'Can I edit my invoices on the platform?',
              body: 'Yes, you can make necessary adjustments to your invoices, such as adding notes or updating billing details. However, unauthorized changes to pricing or other critical data are not allowed.',
            },
            {
              title: 'How does the Stripe integration work?',
              body: 'Our platform seamlessly integrates with Stripe via API. This allows you to connect your Stripe account, manage customers, process payments, and generate payment links directly from our platform.',
            },
            {
              title: 'What are payment links, and how do I use them?',
              body: 'Payment links are secure, customizable URLs generated through Stripe that you can share with customers to collect payments. You can easily create these links on our platform for any transaction.',
            },
            {
              title: 'How secure is the platform?',
              body: "Security is our top priority. Our platform uses advanced encryption and adheres to industry standards to protect your financial data. However, it's essential that you safeguard your account credentials.",
            },
            {
              title: 'What analytics features does the platform offer?',
              body: 'Our platform provides advanced analytics, including revenue insights, charge trends, RPC Revenue Insights, customer growth metrics, and more, all powered by Stripe’s Charge and Customer APIs.',
            },
            {
              title: 'Can I track customer growth and revenue trends?',
              body: 'Yes, the platform offers detailed insights into customer growth and revenue trends, helping you make informed decisions and optimize your business strategies.',
            },
            {
              title:
                'What should I do if my customers have trouble accessing the platform?',
              body: 'If your customers encounter issues accessing the platform, first ensure that they have correct API key or link from you. If problems persist, contact our support team for assistance.',
            },
            {
              title: 'What types of businesses can use this platform?',
              body: "Our platform is designed for any business that needs to manage invoices, process payments, and analyze financial data. It's particularly suited for businesses already using Stripe for payment processing.",
            },
            {
              title: 'How do I generate a payment link?',
              body: 'To generate a payment link, simply enter the transaction details on our platform. The system will create a secure link that you can share with your customers for payment collection.',
            },
            {
              title: 'Is my financial data safe on the platform?',
              body: "Yes, your financial data is secured using industry-standard encryption and security practices. We also rely on Stripe's robust security infrastructure to ensure the safety of your transactions.",
            },
            {
              title: 'Can I customize my invoices?',
              body: 'Yes, the platform allows you to customize your invoices with different templates and branding options, making it easy to tailor them to your business needs.',
            },
            {
              title: 'What if I need help or have a feature request?',
              body: 'If you need assistance or have a feature request, you can reach out to our support team directly through the platform. We are here to help and continually improve our services based on your feedback.',
            },
            {
              title: 'How can I connect my Stripe account to the app?',
              body: 'Connecting your Stripe account is simple! Just go to the settings menu, select the payment integration option, and follow the prompts to link your account via API.',
            },
            {
              title: 'Can I customize the invoice templates?',
              body: 'Absolutely! Our app offers customizable templates to help you personalize your invoices and showcase your brand identity.',
            },
            {
              title:
                'How do I access and download my invoices for self-printing?',
              body: 'You can easily access and download your invoices by logging into your account and navigating to the invoices section. From there, you can view and download any invoice you need.',
            },
            {
              title: 'Are payments processed securely through the app?',
              body: 'Yes, we ensure secure payment processing by integrating with Stripe`s reliable payment system, providing a safe and trustworthy transaction environment.',
            },
            {
              title:
                'Do higher-tier plans include all the features of lower-tier plans?',
              body: 'Yes, each subsequent plan includes all the features of the previous plans, ensuring that you have access to a cumulative set of benefits as you upgrade your subscription.',
            },
            {
              title: 'Is customer support available for all plans?',
              body: 'Yes, customer support is available for all our users. Enterprise plan subscribers, however, receive priority customer support for any queries or assistance they may need.',
            },
            {
              title: 'How can I upgrade or downgrade my subscription plan?',
              body: 'You can easily manage your subscription plan from your account settings. Simply select the plan you wish to switch to, and our system will guide you through the process seamlessly.',
            },
            // More questions...
          ]}
        />
      </Wrapper>
      {/* <TestimonialsWhiteGrid /> */}
    </Wrapper>
  );
}
