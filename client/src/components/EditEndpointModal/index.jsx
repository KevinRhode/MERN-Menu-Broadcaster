// components/EditEndpointModal.js
import { useState } from "react";

const EditEndpointModal = ({ endpoint, slideshows, onUpdate, onClose }) => {
    
  const [updatedEndpoint, setUpdatedEndpoint] = useState(endpoint);
  const [selectedSlideshows, setSelectedSlideshows] = useState([...endpoint.slideshows] || []);
  const [slideshowsCurrent, setSlideshowsCurrent] = useState(slideshows || []);
  console.log(updatedEndpoint);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEndpoint({
      ...updatedEndpoint,
      [name]: value,
    });
  };
  

  const handleCheckboxChange = (slideshow) => {
    let updatedSlideshows;
   
    console.log();
    if (selectedSlideshows.map(slideshow => slideshow._id).includes(slideshow._id)) {
        updatedSlideshows = selectedSlideshows.filter(existingSlideshow => existingSlideshow._id !== slideshow._id);
    } else {
        updatedSlideshows = [...selectedSlideshows, slideshow];
    }

    setSelectedSlideshows(updatedSlideshows);
    setUpdatedEndpoint({ ...updatedEndpoint, "slideshows": updatedSlideshows });
};
  
  const handleSave = () => {
    // setUpdatedEndpoint({ ...updatedEndpoint, "slideshows": selectedIds });
    // const updatedEndpoint = { ...endpoint, slideshows: selectedIds };
    onUpdate(updatedEndpoint);  // Call parent's onUpdate function to inform about the change.
    onClose();  // Close the modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Endpoint</h2>
        {slideshowsCurrent.map((slideshow) => (
            <div key={slideshow._id}>
              <input
                type="checkbox"
                checked={selectedSlideshows.map(slideshow => slideshow._id).includes(slideshow._id)}
                onChange={() => handleCheckboxChange(slideshow)}
              />
              <label>{slideshow.slideshowName}</label>
            
            </div>
          ))}
        {/* Here you can add fields to edit endpoint attributes */}

        <input 
          type="number" 
          name="deviceId"
          value={updatedEndpoint.deviceId}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditEndpointModal;
