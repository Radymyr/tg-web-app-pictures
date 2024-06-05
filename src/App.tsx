import './App.css';
import React, {
  useEffect,
  useState,
  useCallback,
  FormEventHandler,
} from 'react';

import { ImageUpload } from './components/ImageUpload';
import TextInput from './components/TextInput/TextInput';
import ResponseMessage from './components/ResponseMessage/ResponseMessage';
import { WebApp } from './utils/Initialize';
import spinner from './assets/icons/spinner.svg';
import { isImageFile } from './utils/file';
import { serializeUploadFile } from './utils/serializers';
import { uploadFile } from './api/files';

const App: React.FC = () => {
  useEffect(() => WebApp.ready(), []);

  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    []
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const collectAndSendData = useCallback(async () => {
    const { id } = WebApp.initDataUnsafe.user;

    if (image && text && id) {
      setIsLoading(true);
      const data = serializeUploadFile(image, text, id);

      try {
        const res = await uploadFile(data);
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
    WebApp.MainButton.hide();
  }, [image, text]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      await collectAndSendData();
    },
    [collectAndSendData]
  );

  useEffect(() => {
    WebApp.MainButton.setText('Submit');
    WebApp.MainButton.setParams({ is_visible: true, is_active: true });

    WebApp.MainButton.onClick(collectAndSendData);

    return () => {
      WebApp.MainButton.offClick(collectAndSendData);
    };
  }, [collectAndSendData]);

  useEffect(() => {
    if (!image || !text.trim()) {
      WebApp.MainButton.hide();
    } else {
      WebApp.MainButton.show();
    }
  }, [image, text]);

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
