import 'server-only';

import { v4 as uuidv4 } from 'uuid';

export async function stripePrice(props: {
  price: number;
  apiKey?: string | null;
  currency?: string;
  name?: string;
}): Promise<any> {
  /**
   * @description Get Stripe price
   * @date 2024-08-15
   * @author Ed Ancerys
   * @param {number} price - Stripe price
   * @param {string} apiKey - Stripe API key
   */
  try {
    if (!props.apiKey) {
      throw new Error('🔑 API key is missing');
    }

    const stripe = require('stripe')(props.apiKey);
    const currency = props?.currency || 'usd';
    const name =
      props?.name || `invoicio.io ${amountToCurrency(props?.price, currency)}`;
    const prices = await stripe.prices.search({
      query: `active:'true' AND metadata['name']:'${name}' AND metadata['price']:'${props.price * 100}'`,
    });

    return { price: prices?.data?.[0], pricesPermissionError: false };
  } catch (error: any) {
    return {
      pricesPermissionError: error?.type === 'StripePermissionError',
      error,
    };
  }
}

export async function createProductWithPrice(props: {
  price: number;
  apiKey?: string | null;
  currency?: string;
  nickname?: string;
  name?: string;
  order_id?: string;
  price_info?: string;
  statement_descriptor?: string;
  unit_label?: string;
}): Promise<any> {
  /**
   * @description Create a new price & new product
   * @date 2024-08-15
   * @author Ed Ancerys
   */
  try {
    if (!props.apiKey) {
      throw new Error('🔑 API key is missing');
    }

    const stripe = require('stripe')(props.apiKey);
    const currency = props?.currency || 'usd';
    const name =
      props?.name || `invoicio.io ${amountToCurrency(props?.price, currency)}`;
    const metadata = {
      name,
      order_id: props?.order_id || uuidv4(),
      price_info: props?.price_info || 'One Time Payment Price',
      price: props?.price * 100,
    };

    const price = await stripe.prices.create({
      currency,
      unit_amount: props?.price * 100, // convert to cents
      nickname: props?.nickname || `invoicio.io`,
      metadata,
      // recurring: {
      //   interval: 'month',
      // },
      product_data: {
        name: props?.name || name,
        active: true,
        statement_descriptor: props?.statement_descriptor || name,
        unit_label: props?.unit_label || `invoicio.io`,
        metadata,
      },
    });

    return { price, pricesPermissionError: false };
  } catch (error: any) {
    return {
      pricesPermissionError: error?.type === 'StripePermissionError',
      error,
    };
  }
}

function amountToCurrency(amount?: number, currency?: string) {
  if (!amount) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'usd',
  }).format(amount);
}
