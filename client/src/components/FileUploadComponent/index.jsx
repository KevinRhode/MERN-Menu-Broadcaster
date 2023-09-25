import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadComponent;
