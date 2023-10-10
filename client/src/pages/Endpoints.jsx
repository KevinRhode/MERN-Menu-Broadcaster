import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_ENDPOINT } from '../utils/queries';
import Auth from '../utils/auth';
import Slideshow from '../components/Slideshow'


function Endpoint(props) {
//   const [formState, setFormState] = useState({ email: '', password: '' });
const {id} = useParams();
const { loading, error, data } = useQuery(GET_ENDPOINT,{variables:{getEndpointId:id},pollInterval: 60000});
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
return (
  <div style={{display:'flex'}} className="slideshow-container">
    {data.getEndpoint.length === 0 ? (
      <p>No slideshows available</p>
    ) : (
      <Slideshow images={data.getEndpoint.slideshows}/>
      // console.log(data.getEndpoint)
      
      // data.getEndpoint.map((slide) => (
      //   <div key={slide._id} className="slide-thumbnail">
      //     {/* Assuming the files are served from a /slides/ folder on the server */}
      //     <img style={{width:'100%'}} src={`/uploads/${slide.filename}.${slide.extname}`} alt={slide.filename} />
      //     <p>{slide.filename}</p>
      //   </div>
      // ))
    )}
  </div>
);
}

export default Endpoint;