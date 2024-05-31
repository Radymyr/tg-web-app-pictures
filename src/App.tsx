import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ImageUpload from './components/ImageUpload/ImageUpload';
import TextInput from './components/TextInput/TextInput';
import ResponseMessage from './components/ResponseMessage/ResponseMessage';
import { WebApp } from './utils/Initialize';
import spinner from './assets/icons/spinner.svg';

interface Headers {
  [key: string]: string;
}

const SERVERS_URL = 'http://localhost:3000/upload';
const headers: Headers = { 'Content-Type': 'multipart/form-data' };

const App: React.FC = () => {
  useEffect(() => WebApp.ready(), []);

  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isImageFile = (file: File) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log('selectedFile:', selectedFile);

      if (isImageFile(selectedFile)) {
        setImage(selectedFile);
        setText('');
        setResponse('');
      } else {
        setImage(null);
        setText('');
        setResponse('Please upload a valid image file (JPEG, PNG, GIF).');
      }

      setFileKey((prevKey) => prevKey + 1);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    WebApp.MainButton.setText('Submit');
    WebApp.MainButton.setParams({ is_visible: true, is_active: true });

    const handleSubmit = async () => {
      const { id } = WebApp.initDataUnsafe.user;
      if (image && text && id) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('photo', image);
        formData.append('text', text.trim());
        formData.append('userId', id.toString());

        try {
          const res = await axios.post(SERVERS_URL, formData, { headers });
          setResponse(res.data.description);
          if (res.status === 200) {
            setImage(null);
            setText('');
          }
        } catch (err) {
          console.error(err);
          setResponse('An error occurred while analyzing the image.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setResponse('Please provide both an image and text.');
      }
    };

    const handleClick = () => {
      handleSubmit();
      WebApp.MainButton.hide();
    };

    WebApp.MainButton.onClick(handleClick);

    return () => {
      WebApp.MainButton.offClick(handleClick);
    };
  }, [image, text]);

  useEffect(() => {
    if (!image || !text.trim()) {
      WebApp.MainButton.hide();
    } else {
      WebApp.MainButton.show();
    }
  }, [image, text]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Upload an image</h1>
      </header>
      <p className="text">Valid image file (JPEG, PNG, GIF)</p>
      <ImageUpload
        onChange={handleImageChange}
        key={fileKey}
      />
      {response && <ResponseMessage message={response} />}
      {image &&
        (isLoading ? (
          <img
            src={spinner}
            alt="Loading..."
          />
        ) : (
          <TextInput
            value={text}
            onChange={handleTextChange}
          />
        ))}
    </div>
  );
};

export default App;
