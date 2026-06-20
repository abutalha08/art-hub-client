'use server';

import { revalidatePath } from 'next/cache';
import { deleteMutation, serverMutation } from '../server';

export const addArtwork = async (data) => {
  const resData = await serverMutation('/api/artworks', 'POST', data);
  return resData;
};
export const updateArtwork = async (data, id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await serverMutation(`/api/artworks/${id}`, 'PATCH', data);
  return resData;
};
export const deleteArtwork = async (id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await deleteMutation(`/api/artworks/${id}`);
  revalidatePath('/dashboard/artists/manage-artworks');
  return resData;
};