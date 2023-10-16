import React, { useState } from 'react';
import Slideshow from '../Slideshow';




function EndpointPreview(props) {

  return (
    <div>
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
          <div className='thumbnail'>
            <Slideshow images={endpoint.slideshows}/>
          </div>
          <button onClick={() => props.onEdit(endpoint)}>Edit</button>
          {/* {selectedImages.includes(slide._id) && <div className="checkmark">✔</div>} */}
        </div>
      ))}
      
    </div>
    
    </div>
  );
}

export default EndpointPreview;
