import React from 'react';
import './ResponseMessage.css';

interface ResponseMessageProps {
  message: string;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ message }) => {
  return <p>{message}</p>;
};

export default ResponseMessage;
