import { serverFetch, serverMutation } from "../server";

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


// ডাটাবেজ থেকে লাইভ প্রোফাইল আনার ফাংশন
export const fetchUserProfile = async (email) => {
  try {
    return await serverFetch(`/api/users/profile/${email}`);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

// প্রোফাইল আপডেট করার ফাংশন
export const updateUserProfile = async (email, profileData) => {
  try {
    return await serverMutation(`/api/users/profile/${email}`, "PATCH", profileData);
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Something went wrong" };
  }
};