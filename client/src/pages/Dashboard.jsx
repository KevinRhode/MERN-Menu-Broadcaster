import { useMutation, useQuery } from "@apollo/client";
import FileUploadComponent from "../components/FileUploadComponent";
import EndpointPreview from "../components/EndpointPreview";
import Nav from "../components/Nav";

import CreateSlideShow from "./CreateSlideShow";
import { ADD_SLIDE } from "../utils/mutations";
import { QUERY_USER, GET_ALL_SLIDES, GET_ALL_ENDPOINTS } from '../utils/queries';
import { useState } from "react";
import EndpointCreator from "../components/EndpointCreator";


import axios from 'axios'; // Assuming you're using axios for HTTP requests


const Dashboard = (props) => {

  const [addSlideToDb, { error:slideError }] = useMutation(ADD_SLIDE);

  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading, error, data } = useQuery(GET_ALL_SLIDES);   
  const { loading: endpointLoading, error: err,data: endpointData} = useQuery(GET_ALL_ENDPOINTS)
  

  const [slides, setSlides] = useState([...props.slides]);
  const [slideshows, setSlideshows] = useState([...props.slideshows]);
  const [endpoints, setEndpoints] = useState([...props.endpoints]);
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    
    setFile(e.target.files[0]);
    console.log(e.target)
    console.log('on file change');
  };
  const addSlide = (slide) => {
    setSlides([...slides, slide]);
  };
  const addSlideshow = (slideshow)=> {
    setSlideshows([...slideshows,slideshow]);
  }
  const addEndpoint = (endpoint) => {
    setEndpoints([...endpoints, endpoint]);
  }
  
  
  return (
    <div className="container">
       <Nav/>
     <div>
     <p>Home </p>
     <FileUploadComponent addSlide={addSlide}/>
     
     {/* {data && (<SlideComponent slides={slides}/>)} */}
     {slides && (<CreateSlideShow slides={slides} addSlideshow={addSlideshow} onFileChange={onFileChange} />)}
     {slideshows && (<EndpointCreator slideshows={slideshows} addEndpoint={addEndpoint} />)}
     {endpoints && (<EndpointPreview endpoints={endpoints}/>)}
     {console.log(endpoints)}

      </div>
       
    </div>
  );
};

export default Dashboard;
