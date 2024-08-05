import React from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  return (
    <label className="image-input-wrapper">
      <input
        accept="image/png, image/jpeg"
        type="file"
        onChange={onChange}
      />
    </label>
  );
};
