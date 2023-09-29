import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SLIDESHOWS } from "../../utils/queries";
import { ADD_ENDPOINT } from "../../utils/mutations";

function EndpointCreator(props) {
  
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
      console.log("Endpoint created:", result);
    } catch (err) {
      console.error("Failed to create endpoint:", err);
    }
  };

  // if (slideshowLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Create Endpoint</h2>
      {props.slideshows.map((slideshow) => (
        <div key={slideshow._id}>
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
          {slideshow._id}
        </div>
      ))}
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
  );
}

export default EndpointCreator;