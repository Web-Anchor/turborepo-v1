import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a GET!',
    })
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  console.log('BODY ', params, body);

  return new Response(
    JSON.stringify({
      message: 'This was a POST!',
    })
  );
};

export const DELETE: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a DELETE!',
    })
  );
};

export const ALL: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
