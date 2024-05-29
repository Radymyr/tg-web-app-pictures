import React from 'react';
import './TextInput.css';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <>
      <label className="text-label">Your question about the photo</label>
      <input
        type="text"
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder="Enter your text here"
      />
    </>
  );
};

export default TextInput;
