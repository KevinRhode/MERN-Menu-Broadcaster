import React, { useState, useRef } from 'react';
import './ThumbnailList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { UPDATE_SLIDESHOW, DELETE_SLIDE } from '../../utils/mutations'
import { useMutation } from '@apollo/client';
import ConfirmationModal from '../ConfirmationModal';




function ThumbnailList(props) {

  const loadedSelected = props.selectedImages;
  const [showModal, setShowModal] = useState(false);
  const [deleteSlide, { loading, error }] = useMutation(DELETE_SLIDE);
  const newSelectedImages = loadedSelected ? loadedSelected.slides.map(slide => slide._id) : [];
  const [formsState, setFormsState] = useState({ slideshowName: loadedSelected ? loadedSelected.slideshowName : '' });
  const [selectedImages, setSelectedImages] = useState(newSelectedImages);
  const [imageRatios, setImageRatios] = useState({});
  const fileInputRef = useRef(null);

  const handleAspectCheck = (image) => {
    const img = new Image();
    img.onload = function () {
      const aspectRatio = this.width / this.height;
      setImageRatios(prevRatios => ({
        ...prevRatios,
        [image._id]: aspectRatio
      }));
    }
    img.src = imageUrl;
  }

  const promptDelete = (slideId, delVal) => {
    setShowModal(true);
  }
  const handleDelete = async (slideId, delVal) => {
    
    const gqlResponse = await deleteSlide({ variables: { slideId } });
    props.delSlide(slideId, delVal);
    setShowModal(false); // Close the modal
  }

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
  const onSubmit = async (e) => {
    //console.log('on submit hit')
  }
  const handleEdit = (id, e) => {
    e.stopPropagation();
    if (fileInputRef.current) {      
      fileInputRef.current.click();
    }   

  }
  // console.log(selectedImages);
  return (
    <div className='accentBorder'>
      <div className="thumbnail-list">
        {props.images.map((slide) => (
          <div
            key={slide._id}
            className={`thumbnail ${selectedImages.includes(slide._id) ? 'selected' : ''}`}
            onClick={() => handleImageClick(slide._id)}
            style={{ backgroundImage: `url(${'/uploads/' + slide.filename + '.' + slide.extname})` }}
          >
            {selectedImages.includes(slide._id) && <div className="checkmark"><FontAwesomeIcon icon={faCheck} /></div>}
            {selectedImages.length === 1 && selectedImages.includes(slide._id) ? (<div onClick={(e) => handleEdit(slide._id, e)} name='id' className='editImg'>
              <form onSubmit={onSubmit}>
                <div>
                  <input id={slide._id} ref={fileInputRef} name={slide.filename + '.' + slide.extname} onChange={props.onFileChange} className='hidden' type='file' />
                </div>
                <div>
                  <FontAwesomeIcon icon={faWrench} />
                </div>
              </form>
            </div>) : (<></>)}
            {selectedImages.length === 1 && selectedImages.includes(slide._id) ? (<div onClick={()=> promptDelete()} name='del' className='deleteImg'>



              <FontAwesomeIcon icon={faTrashAlt} />


            </div>) : (<></>)}
            {showModal && (
        <ConfirmationModal
          title="Confirm Deletion"
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDelete(slide._id,(slide.filename + '.' + slide.extname))}
        >
          Are you sure you want to delete this slide?
        </ConfirmationModal>
      )}
          </div>
        ))}

      </div>
      <h2>{props.btn} Slideshow</h2>

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


      {loadedSelected ? (<button onClick={() => props.handleEdit(loadedSelected ? loadedSelected._id : "", selectedImages, formsState.slideshowName)}>{props.btn} Slideshow</button>) :
        (<button onClick={() => props.handleCreate(selectedImages)}>{props.btn} Slideshow</button>)}

    </div>
  );
}

export default ThumbnailList;
