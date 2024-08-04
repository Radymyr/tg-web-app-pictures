import './App.css';
import React, {
  useEffect,
  useState,
  useCallback,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';

import { ImageUpload } from './components/ImageUpload';
import TextInput from './components/TextInput/TextInput';
import ResponseMessage from './components/ResponseMessage/ResponseMessage';
import spinner from './assets/icons/spinner.svg';
import { isImageFile } from './utils/file';
import { serializeUploadFile } from './utils/serializers';
import { uploadFile } from './api/files';
import {
  getUserData,
  hideMainButton,
  readyWebApp,
  setupMainButton,
  showMainButton,
  clearMainButtonHandler,
  setMainButtonHandler,
  disableMainButton,
  enableMainButton,
} from './utils/webApp';

const App: React.FC = () => {
  useEffect(() => {
    readyWebApp();
    setupMainButton();
    hideMainButton();
  }, []);

  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];

        if (isImageFile(selectedFile)) {
          setImage(selectedFile);
          setText('');
          setResponse('');
        } else {
          setImage(null);
          setText('');
          setResponse(
            'Please upload a valid image file (JPEG, PNG, WEBP, GIF,).'
          );
        }
        hideMainButton();
        setFileKey((prevKey) => prevKey + 1);
      }
    },
    []
  );

  const handleTextChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setText(value);

      if (value.trim()) {
        showMainButton();
      } else {
        hideMainButton();
      }
    },
    []
  );

  const collectAndSendData = useCallback(async () => {
    const { id } = getUserData();

    if (image && text && id) {
      setIsLoading(true);
      const data = serializeUploadFile(image, text, id);

      try {
        disableMainButton();
        const res = await uploadFile(data);
        setResponse(res.data.description);
        setImage(null);
        setText('');
      } catch (err) {
        console.error(err);
        setResponse(
          'An error occurred while analyzing the image or no permission.'
        );
      } finally {
        setIsLoading(false);
        enableMainButton();
      }
    } else {
      setResponse('Please provide both an image and text.');
    }
    hideMainButton();
  }, [image, text]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      await collectAndSendData();
    },
    [collectAndSendData]
  );

  useEffect(() => {
    setMainButtonHandler(collectAndSendData);
    return () => {
      clearMainButtonHandler(collectAndSendData);
    };
  }, [collectAndSendData]);

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="container"
    >
      <header className="header">
        <h1 className="title">Upload your image</h1>
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
            label="Your question about the photo"
            placeholder="Enter your text here"
            inputId="text-input"
          />
        ))}
    </form>
  );
};

export default App;
