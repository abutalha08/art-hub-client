import { serverFetch } from "./server";

export const getSubscriptionById = async (subscriptionId) => {
  return await serverFetch(`/api/subscriptions?subscription_id=${subscriptionId}`);
};
