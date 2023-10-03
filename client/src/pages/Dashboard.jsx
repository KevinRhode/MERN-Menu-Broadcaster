import { useQuery } from "@apollo/client";
import FileUploadComponent from "../components/FileUploadComponent";
import SlideComponent from "../components/Slide";
import Slideshow from "../components/Slideshow";
import Nav from "../components/Nav";

import CreateSlideShow from "./CreateSlideShow";

import { QUERY_USER, GET_ALL_SLIDES } from '../utils/queries';
import { useState } from "react";
import EndpointCreator from "../components/EndpointCreator";

const Dashboard = (props) => {
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading, error, data } = useQuery(GET_ALL_SLIDES);   
  

  const [slides, setSlides] = useState([...props.slides]);
  const [slideshows, setSlideshows] = useState([...props.slideshows]);
  const [endpoints, setEndpoints] = useState([...props.endpoints]);

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
     {slides && (<CreateSlideShow slides={slides} addSlideshow={addSlideshow} />)}
     {slideshows && (<EndpointCreator slideshows={slideshows} />)}


      </div>
       
    </div>
  );
};

export default Dashboard;
