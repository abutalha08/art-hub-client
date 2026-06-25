import { serverFetch } from "../server";

export const getAllTransactions =
  async () => {
    return await serverFetch(
      "/api/admin/transactions"
    );
  };