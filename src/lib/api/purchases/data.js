import { serverFetch } from "../server";

export const getPurchasedArtworks = async (email) => {
  return await serverFetch(`/api/purchases/${email}`);
};



export const getBuyerStats = async (email) => {
  return await serverFetch(`/api/buyer-stats/${email}`);
};

// sales history
export const getArtistSales = async (
  email
) => {
  return serverFetch(
    `/api/artist-sales/${email}`
  );
};

// sales stats
export const getArtistSalesStats =
  async (email) => {
    return serverFetch(
      `/api/artist-sales-stats/${email}`
    );
  };