'use client';

import { useRef, useState } from 'react';
import { classNames } from '@repo/lib';
import { Button, HeaderSection, Wrapper } from '@repo/components';
import { toast } from 'sonner';
import { maxLength } from '@config/index';
import axios from 'axios';

type Props = {
  class?: string;
};

export default function RateForm(props: Props): React.ReactElement {
  const [state, setState] = useState<{
    fetching?: string;
    rating: number;
  }>({
    rating: 5,
  });
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(form: any) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)); // 🚧 UI update timeout
      setState((prev) => ({ ...prev, fetching: 'rating' }));
      const comments = form.get('comments');

      // --------------------------------------------------------------------------------
      // 📌  Comment validation
      // --------------------------------------------------------------------------------
      if (comments.length < 10) {
        throw new Error('Please provide a detailed comment.');
      }

      const { data, status } = await axios({
        url: '/api/v1/add-rating',
        method: 'POST',
        data: {
          rating: state.rating,
          comments,
        },
      });

      if (status !== 200 || data?.error) {
        throw new Error(data?.error);
      }

      toast.success(
        `Thanks for rating your experience with ${state?.rating} stars. 🌟`
      );
      formRef.current?.reset(); // Reset form ref after successful submission
    } catch (error: any) {
      console.error('🔑 error', error, JSON.stringify(error));
      toast.error(error.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined, rating: 5 }));
    }
  }

  function handleRating(rating: number) {
    setState((prev) => ({ ...prev, rating }));
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Rate Your Experience."
        description={[
          'Share your feedback by rating your experience with our services. Your input helps us enhance our offerings and ensure we meet your expectations.',
        ]}
        subtitle="Your Rating Shapes Our Service!"
        type="page-header"
      />

      <form className={classNames(props.class)} ref={formRef} action={submit}>
        <div className="flex flex-row gap-2 mb-5">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              key={i}
              className={classNames('h-6 w-6 cursor-pointer')}
              onClick={() => handleRating(i + 1)}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill={
                    state.rating >= i + 1
                      ? '#FFA500'
                      : '#D3D3D3' /* Orange when rating is met, gray otherwise */
                  }
                ></path>{' '}
              </g>
            </svg>
          ))}
        </div>

        <div className="mt-2">
          <textarea
            rows={5}
            name="comments"
            className="block w-full rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your message"
            defaultValue={''}
            maxLength={maxLength?.comment}
            required
          />
        </div>

        <Button
          title="Submit"
          type="submit"
          fetching={state.fetching === 'rating'}
          className="mt-6 ml-auto"
        />
      </form>
    </Wrapper>
  );
}
