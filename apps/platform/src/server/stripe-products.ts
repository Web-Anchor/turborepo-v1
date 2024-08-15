import 'server-only';

export async function stripePrice(
  price: number,
  apiKey?: string | null
): Promise<any> {
  /**
   * @description Get Stripe price
   * @date 2024-08-15
   * @author Ed Ancerys
   * @param {number} price - Stripe price
   * @param {string} apiKey - Stripe API key
   */
  try {
    if (!apiKey) {
      throw new Error('🔑 API key is missing');
    }

    const stripe = require('stripe')(apiKey);
    const prices = await stripe.prices.search({
      query: `active:'true' AND metadata['name']:'invoicio.io' AND metadata['price']:'${price}'`,
    });

    return { price: prices?.data?.[0], pricesPermissionError: false };
  } catch (error: any) {
    return {
      pricesPermissionError: error?.type === 'StripePermissionError',
      error,
    };
  }
}
