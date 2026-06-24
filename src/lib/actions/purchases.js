// lib/actions/purchases.js

'use server'

import { serverMutation } from "../api/server";

// import { serverMutation } from "../api/server";

export const createPurchase = async (purchaseInfo) => {
  return await serverMutation(
    "/api/purchases",
    "POST",
    purchaseInfo
  );
};