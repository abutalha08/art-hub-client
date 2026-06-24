import { serverFetch } from "../server";

export const getAllUsers = async () => {
  return serverFetch("/api/users");
};