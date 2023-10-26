import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";

import { ADD_SLIDE } from '../../utils/mutations';

import axios from 'axios'; // Assuming you're using axios for HTTP requests

const FileUploadComponent = (props) => {
  const [addSlide, { error }] = useMutation(ADD_SLIDE);
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
      // console.log(response);
      const {0:filename,1:extname} = response.data.file.split('\\')[2].split('.');
      // console.log(response.data.file.split('\\')[2].split('.'));
      // console.log(file);
      // console.log(filename);
      // console.log(extname);
      const gqlResponse = await addSlide({variables:{filename,extname}});
      props.addSlide(gqlResponse.data.addSlide);

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div style={{border:"black solid 0.25rem", borderRadius:'0.5rem'}}>
      <form onSubmit={onSubmit} >
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          <button style={{margin:'0.25rem'}} type="submit">Upload</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadComponent;
