import React from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  return (
    <label className="image-input-wrapper">
      <input
        accept="image/jpeg, image/jpg, image/png, image/gif, image/webp"
        type="file"
        onChange={onChange}
      />
    </label>
  );
};
