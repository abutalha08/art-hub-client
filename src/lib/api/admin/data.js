import { serverFetch } from "../server";

export const getAllTransactions =
  async () => {
    return await serverFetch(
      "/api/admin/transactions"
    );
  };

  export const getAdminAnalytics = async () => {
  return await serverFetch(
    "/api/admin/analytics"
  );
};

export const getAdminCharts =
  async () => {
    return await serverFetch(
      "/api/admin/charts"
    );
  };