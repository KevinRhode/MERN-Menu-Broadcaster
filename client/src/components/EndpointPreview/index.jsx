import React, { useState, useEffect } from 'react';
import Slideshow from '../Slideshow';




function EndpointPreview(props) {
  const [imageRatios, setImageRatios] = useState({});

  useEffect(() => {
    props.endpoints.forEach(endpoint => {
      // Assume you are loading the first image from the slideshows for this example.
      const imageUrl = `/uploads/${endpoint.slideshows[0].slides[0].filename}.${endpoint.slideshows[0].slides[0].extname}`;
      const img = new Image();
      img.onload = function() {
        const aspectRatio = this.width / this.height;
        setImageRatios(prevRatios => ({
          ...prevRatios,
          [endpoint._id]: aspectRatio
        }));
      }
      img.src = imageUrl;
    });
  }, [props.endpoints]);

  return (
    <div >
    <div className="endpoint-list">
      {/* {console.log(props)} */}
      {props.endpoints.map((endpoint) => (
        <div

          key={endpoint._id}
          // className={`endpoint ${selectedImages.includes(slide._id) ? 'selected' : ''}`}
          // onClick={() => handleImageClick(slide._id)}
          // style={{ backgroundImage: `url(${'/uploads/'+slide.filename + '.' +slide.extname})` }}
        >
          {endpoint.deviceId}
          <div className={`thumbnail ${imageRatios[endpoint._id] > 1 ? 'landscape' : 'portrait'}`}>
            <Slideshow images={endpoint.slideshows}/>
          </div>
          <button onClick={(e) => {props.onEdit(endpoint); e.stopPropagation();}}>Edit</button>
          {/* {selectedImages.includes(slide._id) && <div className="checkmark">✔</div>} */}
        </div>
      ))}
      
    </div>
    
    </div>
  );
}

export default EndpointPreview;
