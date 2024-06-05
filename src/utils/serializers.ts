export const serializeUploadFile = (
  image: File,
  text: string,
  userId: number
) => {
  const formData = new FormData();
  formData.append('photo', image);
  formData.append('text', text.trim());
  formData.append('userId', userId.toString());

  return formData;
};
