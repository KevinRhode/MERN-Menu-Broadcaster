import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALL_SLIDESHOWS, ADD_ENDPOINT } from "../../utils/queries";

function EndpointCreator() {
  const { data: slideshowData, loading: slideshowLoading, error: slideshowError } = useQuery(GET_ALL_SLIDESHOWS);
  const [addEndpoint] = useMutation(ADD_ENDPOINT);

  const [selectedSlideshows, setSelectedSlideshows] = useState([]);

  useEffect(() => {
    if (slideshowError) {
      console.error("Failed to fetch slideshows:", slideshowError);
    }
  }, [slideshowError]);

  const handleSubmit = async () => {
    try {
      const result = await addEndpoint({ variables: { shows: selectedSlideshows } });
      console.log("Endpoint created:", result);
    } catch (err) {
      console.error("Failed to create endpoint:", err);
    }
  };

  if (slideshowLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Create Endpoint</h2>
      {slideshowData.getAllslideshow.map((slideshow) => (
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
      <button onClick={handleSubmit}>Create Endpoint</button>
    </div>
  );
}

export default EndpointCreator;