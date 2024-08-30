import { useTester } from '@hooks/index';
import axios from 'axios';

export default function Page() {
  const { data } = useTester();
  console.log('page loaded', data);

  async function googlePlacesApi() {
    try {
      const { data } = await axios.post('/api/v1/google/places.json', {
        name: 'fitness hut',
        // name: 'Googleplex',
        location: '38.73997968491052,-9.147377124298961',
        // location: '37.4221,-122.0841',
        // placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      });

      console.log('Google Reviews:', data);
    } catch (error) {
      console.error('Error fetching Google Reviews:', (error as Error).message);
    }
  }

  return (
    <section className="flex flex-col my-16 gap-4 p-5 border border-slate-200 rounded-md">
      <h1>Actions</h1>

      <button
        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={googlePlacesApi}
      >
        Google Places API
      </button>
    </section>
  );
}
