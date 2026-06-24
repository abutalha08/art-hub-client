import { serverMutation } from "../server";

export const updateUserRole = async (
  userId,
  role
) => {
  return serverMutation(
    `/api/users/${userId}/role`,
    "PATCH",
    { role }
  );
};