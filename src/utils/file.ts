export const isImageFile = (file: File) => {
  const acceptedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  return acceptedImageTypes.includes(file.type);
};
