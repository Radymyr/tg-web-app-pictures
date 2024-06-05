import React from 'react';
import './TextInput.css';

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  inputId: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  inputId,
}) => {
  return (
    <>
      <label
        className="text-label"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInput;
