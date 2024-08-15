'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button, HeaderSection, Wrapper } from '@repo/components';
import axios from 'axios';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
  }>({});

  async function searchProduct() {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: 'search' }));

      const { data, status } = await axios({
        url: '/api/v1/stripe/on-click/get-product',
        method: 'POST',
        data: { price: 11 },
      });

      console.log('✅ API RESPONSE', data);

      if (status !== 200 || data?.error) {
        throw new Error(data?.error?.raw?.message);
      }

      // toast.success(`API key updated successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined, edit: undefined }));
    }
  }

  async function newProduct() {
    try {
      // --------------------------------------------------------------------------------
      // 📌  Add Stripe API key to db
      // --------------------------------------------------------------------------------
      setState((prev) => ({ ...prev, fetching: 'new' }));

      const { data, status } = await axios({
        url: '/api/v1/stripe/on-click/create-product',
        method: 'POST',
        data: { price: 11 },
      });

      console.log('✅ API RESPONSE', data);

      if (status !== 200 || data?.error) {
        throw new Error(data?.error?.raw?.message);
      }

      // toast.success(`API key updated successfully`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined, edit: undefined }));
    }
  }

  return (
    <Wrapper>
      <HeaderSection
        title="Stripe API Keys. Enhance Your Platform with Secure Payment Integration."
        description="Manage and secure your payment transactions by adding your Stripe API keys on our platform. Seamlessly integrate Stripe's powerful payment solutions, enhance transaction security, and unlock a world of possibilities for your business. Take control of your payment processes with ease and efficiency."
        subtitle="Powering Secure Transactions, One Key at a Time!"
        type="page-header"
      />

      <Button
        title="Get Product"
        onClick={searchProduct}
        fetching={state.fetching === 'search'}
      />
      <Button
        title="Create new Product"
        onClick={newProduct}
        fetching={state.fetching === 'new'}
      />
    </Wrapper>
  );
}
