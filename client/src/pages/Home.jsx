import { useQuery } from "@apollo/client";
import FileUploadComponent from "../components/FileUploadComponent";
import SlideComponent from "../components/Slide";
import Slideshow from "../components/Slideshow";

import { GET_ALL_SLIDES } from '../utils/queries';
import { useState } from "react";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_SLIDES);  
  

  const addSlide = (slide)=>{
    const newSlideList = [...listState,slide]
  }
  
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const task = await createTask({
  //       variables: { taskname:formState.taskname, location: formState.location },
  //       context: authContext,
  //     });

  //     //setFormState({...formState,taskname:'',location:''});
  //     setListState([...listState,task.data.createTask]);
     
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
     <div>
     <p>Home</p>
     <FileUploadComponent addSlide={addSlide}/>
     <SlideComponent slides={data.getAllslides}/>
      </div>
       
    </div>
  );
};

export default Home;
