import type { APIRoute } from 'astro';
import axios from 'axios';

const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY || '';

/**
 * Fetch Google Reviews for a business by Place ID or Name
 * @param {string} referenceId - The Place ID of the business
 * @param {string} name - The name of the business (optional if Place ID is provided)
 * @param {string} location - The location of the business (required if name is used)
 * @returns {Promise<any>} - Returns a promise with the reviews data
 */

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const body = await request.json();
    let { placeId, name, location = '' } = body;
    let candidates: { [key: string]: string }[] | undefined;
    console.log('📌 Business Input Data:', body);

    // Step 1: If placeId is not provided, get it by searching with name and location
    if (!placeId && name) {
      const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(name)}&inputtype=textquery&fields=place_id&locationbias=point:${location}&key=${GOOGLE_API_KEY}`;

      const placeSearchResponse = await axios.get(placeSearchUrl);
      candidates = placeSearchResponse?.data?.candidates;
      console.log('Place Search Response:', placeSearchResponse.data);

      if (placeSearchResponse.data.candidates.length > 0) {
        placeId = placeSearchResponse.data.candidates[0].place_id;
      } else {
        throw new Error('Place not found with the provided name and location');
      }
    }

    if (!placeId) {
      throw new Error('Place ID or valid name and location must be provided');
    }

    // Step 2: Fetch reviews using the Place ID
    console.log('✨ Fetching reviews for Place ID:', placeId);
    // v0 end point const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${GOOGLE_API_KEY}`;
    const placeDetailsUrl = `https://places.googleapis.com/v1/places/${placeId}`;
    const placeDetailsResponse = await axios.get(placeDetailsUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-Fieldmask':
          'id,displayName,formattedAddress,plusCode,reviews,primaryType,shortFormattedAddress',
      },
    });

    if (placeDetailsResponse.status !== 200) {
      throw new Error(
        `Error fetching reviews: ${placeDetailsResponse.data.status}`
      );
    }

    return new Response(
      JSON.stringify({
        data: placeDetailsResponse.data,
        candidates,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching Google Reviews:', (error as Error).message);
    return new Response(
      JSON.stringify({
        message: 'Error fetching Google Reviews',
      }),
      { status: 500 }
    );
  }
};

// Example usage:
// fetchGoogleReviews('ChIJN1t_tDeuEmsRUsoyG83frY4')
//   .then(reviews => console.log(reviews))
//   .catch(error => console.error(error));
