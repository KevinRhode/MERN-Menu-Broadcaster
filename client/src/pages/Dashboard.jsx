import { useMutation, useQuery } from "@apollo/client";
import FileUploadComponent from "../components/FileUploadComponent";
import EndpointPreview from "../components/EndpointPreview";
import EditEndpointModal from "../components/EditEndpointModal";
import InfoModal from "../components/InfoModal";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import CreateSlideShow from "./CreateSlideShow";
import { ADD_SLIDE, UPDATE_SLIDE, UPDATE_ENDPOINT, DELETE_SLIDE } from "../utils/mutations";
import { QUERY_USER, GET_SLIDE, GET_ALL_SLIDES, GET_ALL_ENDPOINTS } from '../utils/queries';
import { useState } from "react";
import EndpointCreator from "../components/EndpointCreator";


import axios from 'axios'; // Assuming you're using axios for HTTP requests


const Dashboard = (props) => {
  const [editingEndpoint, setEditingEndpoint] = useState(null);  // which endpoint is currently being edited, null if none.
  const [infoClicked, setInfoClicked] = useState(null);
  const [addSlideToDb, { error:slideError }] = useMutation(ADD_SLIDE);
  const [deleteSlideToDB, {error:slideDelError}] = useMutation(DELETE_SLIDE);
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  
  const { loading, error, data } = useQuery(GET_ALL_SLIDES);   
  const { loading: endpointLoading, error: err,data: endpointData} = useQuery(GET_ALL_ENDPOINTS)
  

  const [slides, setSlides] = useState([...props.slides]);
  const [slideshows, setSlideshows] = useState([...props.slideshows]);
  const [endpoints, setEndpoints] = useState([...props.endpoints]);
  const [updateSlide, { error:errorUpdate }] = useMutation(UPDATE_SLIDE);
  const [updateEndpoint, { error:errorEndpoint }] = useMutation(UPDATE_ENDPOINT);
  
  const handleEditEndpoint = (endpoint) => {
    setEditingEndpoint(endpoint);
  };

  const handleInfoClicked = (infoClicked) => {
    setInfoClicked(infoClicked);
  }

  const handleUpdateEndpoint = async (updatedEndpoint) => {
    // Here you can update the endpoint in the state and/or send to the server.
    const reponse = await updateEndpoint({variables:{endpointId:updatedEndpoint._id,slideshows:updatedEndpoint.slideshows.map(slideshow => slideshow._id),deviceId:updatedEndpoint.deviceId}});
    console.log(reponse);
    // if (reponse.message) {
      
    // }
    setEndpoints((prev) => prev.map(ep => ep._id === updatedEndpoint._id ? updatedEndpoint : ep));
    setEditingEndpoint(null);
  };
  // const [file, setFile] = useState(null);
  const deleteFile = async (id)=>{
    const response = await axios.delete(`/uploads/${id}`);
    console.log(response);
  }
  const updateFile = async (fileData,slideId) =>{
    const response = await axios.post('/uploads', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // console.log(response);
    const {0:filename,1:extname} = response.data.file.split('\\')[2].split('.');
    // console.log(response.data.file.split('\\')[2].split('.'));
    // console.log(file);
    // console.log(filename);
    // console.log(extname);
    const gqlResponse = await updateSlide({variables:{slideId,filename,extname}});
    //await deleteFile(slideId);
    const updatedSlide = gqlResponse.data.updateSlide;
    setSlides(prevSlides => {
      return prevSlides.map(slide => {
          if (slide._id === slideId) {  // Assuming each slide has a unique _id property
              return updatedSlide;
          }
          return slide;
      });
  });
    


   

    // props.addSlide(gqlResponse.data.addSlide);
  }

  // const response = await axios.post('/uploads', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // });
  // // console.log(response);
  // const {0:filename,1:extname} = response.data.file.split('\\')[2].split('.');
  // // console.log(response.data.file.split('\\')[2].split('.'));
  // // console.log(file);
  // // console.log(filename);
  // // console.log(extname);
  // const gqlResponse = await addSlide({variables:{filename,extname}});
  // props.addSlide(gqlResponse.data.addSlide);

  const onFileChange = (e) => {
    
    // setFile(e.target.files[0]);
    // console.log(e.target);
    // console.log(e.target.files[0]);
    // console.log(e.target);
    // console.log('on file change');
    if (e.target.id !== null && e.target.files[0] !== null) {
      console.log('on if  passed');
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    
    try {
     deleteFile(e.target.name);
     updateFile(formData,e.target.id);
     
      //setMessage(response.data.message);
    } catch (error) {
      //setMessage(error.response.data.error);
    }

    }
  };
  const addSlide = (slide) => {
    setSlides([...slides, slide]);
  };
  const delSlide = (slideId, delVal) => {   
    //try to delete from server before database
    try {
      deleteFile(delVal);
    } catch (error) {
      return error;
    }
    finally{
      setSlides(slides => slides.filter(slide => slide._id !== slideId));
    }
    
    
  }
  const addSlideshow = (slideshow)=> {
    setSlideshows([...slideshows,slideshow]);
  }
  const addEndpoint = (endpoint) => {
    setEndpoints([...endpoints, endpoint]);
  }
  
  
  return (
    <div className="container">
       <Nav infoClicked={handleInfoClicked}/>
     <div className="content">
    
     <div className="content-inputs">
     <div className="content-inputs-first">
     <FileUploadComponent addSlide={addSlide}/>
     </div>
     <div>
     {slides && (<CreateSlideShow slides={slides} delSlide={delSlide} addSlideshow={addSlideshow} onFileChange={onFileChange} />)}
     </div>
     </div>
     <div className="content-create">
     <div className="content-create-select">
     {slideshows && (<EndpointCreator slideshows={slideshows} addEndpoint={addEndpoint} />)}
     </div>     
     <div className="content-create-ep">
     {endpoints && (<EndpointPreview endpoints={endpoints} onEdit={handleEditEndpoint}/>)}
     </div>  
     </div>
     
     
           
      {editingEndpoint && (
        <EditEndpointModal 
          endpoint={editingEndpoint} 
          slideshows={slideshows}
          onUpdate={handleUpdateEndpoint}
          onClose={() => setEditingEndpoint(null)}
        />
      )}
      {infoClicked && (<InfoModal info={infoClicked} onClose={() => setInfoClicked(null)}/>)}
      </div>
      <div className="footerDiv">
      <Footer/>
     </div>
    </div>
  );
};

export default Dashboard;
