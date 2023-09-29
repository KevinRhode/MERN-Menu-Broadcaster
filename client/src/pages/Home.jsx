import { useQuery } from "@apollo/client";
import React, {useEffect} from "react";
import { QUERY_USER, GET_ALL_SLIDES,GET_ALL_SLIDESHOWS } from '../utils/queries';
import Dashboard from "./Dashboard";
import Nav from "../components/Nav";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading, error, data } = useQuery(GET_ALL_SLIDES); 
  const { data: slideshowData, loading: slideshowLoading, error: slideshowError } = useQuery(GET_ALL_SLIDESHOWS);

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.loggedIn() === false) {
      navigate('/login');
    }
  }, [navigate]);

if (userLoading) return <p>Loading User Infomation...</p>;
if (loading) return <p>Loading Slide Infomation...</p>;
if (slideshowLoading) return <p>Loading Slideshow Information...</p>
if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
   
    <Dashboard slides={data.getAllslides} slideshows={slideshowData.getAllslideshow}/>
    
    </>
  );
};

export default Home;
