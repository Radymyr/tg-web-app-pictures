export const isImageFile = (file: File) => {
  const acceptedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'image/svg+xml',
    'image/heic',
  ];
  return acceptedImageTypes.includes(file.type);
};
