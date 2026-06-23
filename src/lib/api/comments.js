// import { serverFetch } from "../server";
// import { serverMutation } from "../server";
// import { deleteMutation } from "../server";

import { deleteMutation, serverFetch, serverMutation } from "./server";

export const getComments = async (artworkId) => {
  return await serverFetch(
    `/api/artworks/${artworkId}/comments`
  );
};

export const canComment = async (
  artworkId,
  email
) => {
  return await serverFetch(
    `/api/artworks/${artworkId}/can-comment/${email}`
  );
};

export const addComment = async (
  artworkId,
  data
) => {
  return await serverMutation(
    `/api/artworks/${artworkId}/comments`,
    "POST",
    data
  );
};

export const updateComment = async (
  id,
  data
) => {
  return await serverMutation(
    `/api/comments/${id}`,
    "PATCH",
    data
  );
};

export const deleteComment = async (id) => {
  return await deleteMutation(
    `/api/comments/${id}`
  );
};