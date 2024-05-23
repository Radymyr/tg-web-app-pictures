import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

interface Headers {
  [key: string]: string;
}
const SERVERS_URL = 'http://localhost:5000/upload';
const headers: Headers = { 'Content-Type': 'multipart/form-data' };

const App: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      console.log(image);
      const formData = new FormData();
      formData.append('file', image);

      try {
        const res = await axios.post(SERVERS_URL, formData, {
          headers,
        });
        setResponse(res.data.description);
      } catch (err) {
        console.error(err);
        setResponse('An error occurred while analyzing the image.');
      }
    }
  };

  return (
    <div>
      <h1>Upload an image</h1>
      <input
        type="file"
        onChange={handleImageChange}
      />
      <button onClick={handleSubmit}>send</button>
      {response && <p>Ответ: {response}</p>}
    </div>
  );
};

export default App;
