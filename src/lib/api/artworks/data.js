import { serverFetch } from '../server';

export const myArtworks = async (email) => {
  //   console.log(email, 'email');

  const result = await serverFetch(`/api/artworks/${email}`);
    console.log(result, 'my artworks');

  return result;
};
export const fetchArtworks = async (query) => {
  const result = await serverFetch(`/api/artworks?${query}`);

  return result;
};

export const getAllArtworks = async () => {
  return await serverFetch("/api/artworks");
};

export const getFeaturedArtworks = async () => {
  const result = await serverFetch("/api/artworks/featured");
  return result;
};


