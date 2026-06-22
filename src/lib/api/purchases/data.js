import { serverFetch } from "../server";

export const getPurchasedArtworks = async (email) => {
  return await serverFetch(`/api/purchases/${email}`);
};



export const getBuyerStats = async (email) => {
  return await serverFetch(`/api/buyer-stats/${email}`);
};