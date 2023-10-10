import React, { useState } from 'react';
import './ThumbnailList.css';


function ThumbnailList(props) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (id) => {
    // const src = props.images.find(slide => slide._id === id).filename;
    if (selectedImages.includes(id)) {
      setSelectedImages(prevSelected => prevSelected.filter(img => img !== id));
    } else {
      setSelectedImages(prevSelected => [...prevSelected, id]);
    }
  }
  // console.log(selectedImages);
  return (
    <div>
    <div className="thumbnail-list">
      {props.images.map((slide) => (
        <div
          key={slide._id}
          className={`thumbnail ${selectedImages.includes(slide._id) ? 'selected' : ''}`}
          onClick={() => handleImageClick(slide._id)}
          style={{ backgroundImage: `url(${'/uploads/'+slide.filename + '.' +slide.extname})` }}
        >
          {selectedImages.includes(slide._id) && <div className="checkmark">✔</div>}
        </div>
      ))}
      
    </div>
    <label htmlFor="slideshowName">Slideshow Name: </label>
          <input
            placeholder=""
            name="slideshowName"
            type="String"
            id="slideshowName"
            onChange={props.handleChange}
          />
    <button onClick={() => props.handleCreate(selectedImages)}>Create Slideshow</button>
    </div>
  );
}

export default ThumbnailList;
