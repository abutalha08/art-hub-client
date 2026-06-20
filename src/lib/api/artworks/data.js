import { serverFetch } from '../server';

export const myArtworks = async (email) => {
  //   console.log(email, 'email');

  const result = await serverFetch(`/api/artworks/${email}`);
    console.log(result, 'my artworks');

  return result;
};
// export const fetchEvents = async (query) => {
//   const result = await serverFetch(`/api/events?${query.toString()}`);

//   return result;
// };
// export const fetchFeaturedEvents = async () => {
//   const result = await serverFetch(`/api/events/featured`);

//   return result;
// };