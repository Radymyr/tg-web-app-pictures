export const isImageFile = (file: File) => {
  const acceptedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  return acceptedImageTypes.includes(file.type);
};
