import React from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  return (
    <label className="image-input-wrapper">
      <input
        type="file"
        onChange={onChange}
      />
    </label>
  );
};

export default ImageUpload;
