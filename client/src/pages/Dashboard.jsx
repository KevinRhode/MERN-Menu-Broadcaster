import { useQuery } from "@apollo/client";
import FileUploadComponent from "../components/FileUploadComponent";
import SlideComponent from "../components/Slide";
import Slideshow from "../components/Slideshow";

import { QUERY_USER, GET_ALL_SLIDES } from '../utils/queries';
import { useState } from "react";

const Dashboard = (props) => {
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading, error, data } = useQuery(GET_ALL_SLIDES);   

  const [slides, setSlides] = useState([...props.slides]);

  const addSlide = (slide) => {
    setSlides([...slides, slide]);
  };

  
if (userLoading) return <p>Loading User Infomation...</p>;
if (loading) return <p>Loading Slide Infomation...</p>;

if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="container">
     <div>
     <p>Home </p>
     <FileUploadComponent addSlide={addSlide}/>
     
     {data && (<SlideComponent slides={slides}/>)}
      </div>
       
    </div>
  );
};

export default Dashboard;
