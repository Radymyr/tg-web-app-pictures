export const isImageFile = (file: File) => {
  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return acceptedImageTypes.includes(file.type);
};
