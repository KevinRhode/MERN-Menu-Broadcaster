import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SLIDESHOWS } from "../../utils/queries";
import { ADD_ENDPOINT } from "../../utils/mutations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench,faCheck } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";


function EndpointCreator(props) {
  const navigate = useNavigate();
  const [addEndpoint] = useMutation(ADD_ENDPOINT);

  const [selectedSlideshows, setSelectedSlideshows] = useState([]);
  
  const [formState, setFormState] = useState({ deviceID: '' });

  
  // useEffect(() => {
  //   if (slideshowError) {
  //     console.error("Failed to fetch slideshows:", slideshowError);
  //   }
  // }, [slideshowError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      const result = await addEndpoint({ variables: { slideshows: selectedSlideshows, deviceId: formState.deviceID } });  
      //console.log(result.data.addEndpoint);
      // props.addEndpoint(result.data.addEndpoint);    
      console.log("Endpoint created:", result.data.addEndpoint);
    } catch (err) {
      console.error("Failed to create endpoint:", err);
    }
  };

  // if (slideshowLoading) return <p>Loading...</p>;

  return (
    <div className="ecContainer" >
      
      {props.slideshows.map((slideshow) => (
        <div className={`slideshowCasrd ${selectedSlideshows.includes(slideshow._id) ? 'selected' : ''}`} key={slideshow._id} onClick={()=>{
          if (selectedSlideshows.includes(slideshow._id)) {
            setSelectedSlideshows(selectedSlideshows.filter(id => id !== slideshow._id));
            console.log(true);
          } else {
           
            setSelectedSlideshows([...selectedSlideshows, slideshow._id]);
            console.log(false);
          }
        }}>
          <input
            type="checkbox"
            value={slideshow._id}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedSlideshows([...selectedSlideshows, e.target.value]);
              } else {
                setSelectedSlideshows(selectedSlideshows.filter(id => id !== e.target.value));
              }
            }}
          />
          
          
          <p>{slideshow.slideshowName}</p>
          
          <FontAwesomeIcon style={{padding:'0rem 0.5rem', cursor:'pointer'}} icon={faWrench} id={slideshow._id} onClick={(e)=>navigate(`/update/${slideshow._id}`)}/>
          
        </div>
      ))}

      <div className="endofCard">
      <h2>Create Endpoint</h2>
      <label htmlFor="deviceID">Device Endpoint: </label>
          <input
            placeholder=""
            name="deviceID"
            type="number"
            id="deviceID"
            onChange={handleChange}
          />
      <button onClick={handleSubmit}>Create Endpoint</button>
      </div>
      
    </div>
  );
}

export default EndpointCreator;