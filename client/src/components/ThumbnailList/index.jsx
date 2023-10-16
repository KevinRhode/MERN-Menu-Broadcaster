import React, { useState, useRef } from 'react';
import './ThumbnailList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench,faCheck } from '@fortawesome/free-solid-svg-icons';

import {UPDATE_SLIDESHOW} from '../../utils/mutations'




function ThumbnailList(props) {
  const loadedSelected = props.selectedImages;
  const newSelectedImages= loadedSelected ? loadedSelected.slides.map(slide => slide._id) : [];
  const [formsState, setFormsState] = useState({slideshowName:loadedSelected ? loadedSelected.slideshowName : ''});
  const [selectedImages, setSelectedImages] = useState(newSelectedImages);
  const fileInputRef = useRef(null);
  const handleImageClick = (id) => {    
    // const src = props.images.find(slide => slide._id === id).filename;
    
    if (selectedImages.includes(id)) {
      setSelectedImages(prevSelected => prevSelected.filter(img => img !== id));
    } else {
      setSelectedImages(prevSelected => [...prevSelected, id]);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormsState({
      ...formsState,
      [name]: value,
    });
  };
  // const removeTask = async (id) => {
  //   const updatedTasks = [...listState].filter((task) => task._id !== id);
  //   try {
  //     const deletedTask = await deleteTask({
  //       variables: { deleteTaskId:id },
  //       context: authContext,
  //     });
  //     console.log(deletedTask);
  //   } catch (error) {
      
  //   }
  //   setListState(updatedTasks);
  // };
  const onSubmit = async (e) => {
      //console.log('on submit hit')
  }
  const handleEdit = (id,e) => {
    e.stopPropagation();
    // fileInputRef.current.click().stopPropagation();
    if (fileInputRef.current) {
      //console.log('edit');
     // console.log(id);
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
            <form onSubmit={onSubmit}>
              <div> 
                <input id={slide._id} ref={fileInputRef} onChange={props.onFileChange} className='hidden' type='file'/>
                </div>
            <div> 
              <FontAwesomeIcon icon={faWrench} />
              </div>
              </form>
</div>) : (<></>)}
        </div>
      ))}
      
    </div>
    <label htmlFor="slideshowName">Slideshow Name: </label>
    {loadedSelected ? (<input
            placeholder=""
            name="slideshowName"
            type="String"
            id="slideshowName"
            onChange={handleChange}    
            value={formsState.slideshowName}        
          />) : (<input
            placeholder=""
            name="slideshowName"
            type="String"
            id="slideshowName"
            onChange={props.handleChange}            
          />)}
          
          
    {loadedSelected ? (<button onClick={() => props.handleEdit(loadedSelected ? loadedSelected._id: "",selectedImages,formsState.slideshowName)}>{props.btn} Slideshow</button>) :
    (<button onClick={() => props.handleCreate(selectedImages)}>{props.btn} Slideshow</button>)}
    
    </div>
  );
}

export default ThumbnailList;
