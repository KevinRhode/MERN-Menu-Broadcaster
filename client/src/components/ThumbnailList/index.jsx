import React, { useState, useRef } from 'react';
import './ThumbnailList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench,faCheck } from '@fortawesome/free-solid-svg-icons';



function ThumbnailList(props) {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const handleImageClick = (id) => {    
    // const src = props.images.find(slide => slide._id === id).filename;
    
    if (selectedImages.includes(id)) {
      setSelectedImages(prevSelected => prevSelected.filter(img => img !== id));
    } else {
      setSelectedImages(prevSelected => [...prevSelected, id]);
    }
  }
  const handleEdit = (id,e) => {
    e.stopPropagation();
    // fileInputRef.current.click().stopPropagation();
    if (fileInputRef.current) {
      console.log('edit');
      console.log(id);
      fileInputRef.current.click();      
    }
    
    console.log('test');

       
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
          {selectedImages.includes(slide._id) && <div className="checkmark"><FontAwesomeIcon icon={faCheck} /></div>}
          {selectedImages.length === 1  && selectedImages.includes(slide._id) ? (<div onClick={(e)=>handleEdit(slide._id,e)} name='id' className='editImg'>            
            <input id={slide._id} ref={fileInputRef} onChange={(e)=>{props.onFileChange(e)}} className='hidden' type='file'/>
             <FontAwesomeIcon icon={faWrench} />
</div>) : (<></>)}
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
