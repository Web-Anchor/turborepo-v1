'use client';

import { maxLength } from '@config/index';
import { useFeatures } from '@hooks/index';
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

  const { count, isLoading } = useFeatures({});
  console.log(count, isLoading);

  async function submit(form: any) {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: true }));
      const featureName = form.get('featureName');
      const description = form.get('description');
      const comments = form.get('comments');

      const { data, status } = await axios({
        url: '/api/v1/support/feature-request',
        method: 'POST',
        data: { featureName, description, comments },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      toast.success(
        'Thanks for submitting your feature request. We will review it and get back to you soon.'
      );
      mutate(`/api/v1/support/features`);
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
        title="Inspire Change, Drive Innovation - Your Ideas Matter!"
        description="Submit your ideas and suggestions for new features to our Request New Features page. Your feedback is invaluable in helping us enhance our platform and tailor it to meet your evolving needs."
        subtitle="Shape the Future of Our Platform!"
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
                Request New Features
              </h2>
              <Badge
                title={count}
                description={`Feature${count > 1 ? 's' : ''} Requested`}
              />
              <p className="text-sm leading-6 text-gray-600">
                Help us enhance our platform by sharing your ideas for new
                features! We value your feedback and strive to continuously
                improve our services based on your suggestions.
              </p>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <Select
                label="Reason for contacting"
                name="featureName"
                data={[
                  { value: 'enhancements', title: 'Enhancements' },
                  { value: 'new functionality', title: 'New Functionality' },
                  {
                    value: 'customization options',
                    title: 'Customization Options',
                  },
                  {
                    value: 'integration opportunities',
                    title: 'Integration Opportunities',
                  },
                  {
                    value: 'user interface improvements',
                    title: 'User Interface Improvements',
                  },
                  {
                    value: 'automation requests',
                    title: 'Automation Requests',
                  },
                  {
                    value: 'reporting and analytics',
                    title: 'Reporting and Analytics',
                  },
                  {
                    value: 'security enhancements',
                    title: 'Security Enhancements',
                  },
                  {
                    value: 'mobile app features',
                    title: 'Mobile App Features',
                  },
                  {
                    value: 'accessibility upgrades',
                    title: 'Accessibility Upgrades',
                  },
                  {
                    value: 'performance optimization',
                    title: 'Performance Optimization',
                  },
                  { value: 'other', title: 'Other' },
                ]}
              />

              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-800"
              >
                Description <span className="text-xs text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                name="description"
                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Description of the feature you would like to see added to the platform."
                defaultValue={''}
                maxLength={maxLength?.description}
                required
              />
              <p className="text-xs leading-6 text-gray-600">
                Please provide as much detail as possible so we can assist you
                better.
              </p>

              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-800"
              >
                Expected Impact
              </label>
              <input
                type="text"
                placeholder="Expected Impact"
                name="comments"
                maxLength={maxLength?.comment}
                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button fetching={state?.fetching} type="submit">
            Submit Request
          </Button>
        </div>
      </form>
    </Wrapper>
  );
}
