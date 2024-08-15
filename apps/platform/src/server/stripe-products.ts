import 'server-only';

import { v4 as uuidv4 } from 'uuid';

export async function stripePrice(props: {
  price: number;
  apiKey?: string | null;
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
    const prices = await stripe.prices.search({
      query: `active:'true' AND metadata['name']:'invoicio.io' AND metadata['price']:'${props.price}'`,
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
    const price = await stripe.prices.create({
      currency: props?.currency || 'usd',
      unit_amount: props?.price * 100, // convert to cents
      nickname: props?.nickname || `invoicio.io`,
      metadata: {
        name: props?.name || 'invoicio.io',
        order_id: props?.order_id || uuidv4(),
        price_info: props?.price_info || 'One Time Payment Product',
        price: props?.price * 100,
      },
      // recurring: {
      //   interval: 'month',
      // },
      product_data: {
        name: props?.name || `invoicio.io`,
        active: true,
        statement_descriptor: props?.statement_descriptor || `invoicio.io`,
        unit_label: props?.unit_label || `invoicio.io`,
        metadata: {
          name: props?.name || 'invoicio.io',
          order_id: props?.order_id || uuidv4(),
          price_info: props?.price_info || 'One Time Payment Product',
          price: props?.price * 100,
        },
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
