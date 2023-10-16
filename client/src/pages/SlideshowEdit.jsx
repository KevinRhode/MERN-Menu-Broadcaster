
import ThumbnailList from "../components/ThumbnailList";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_SLIDES, GET_SLIDESHOW } from '../utils/queries';
import { UPDATE_SLIDESHOW } from "../utils/mutations";
import React, {useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";

const UpdateSlideShow = (props) => {
  const [listState, setListState] = useState([]);
  const [formState, setFormState] = useState({slideshowName:''});
  const {id} = useParams();
  const { loading: slideLoading, error: slideError, data: slideData } = useQuery(GET_SLIDESHOW,{variables:{getSlideshowId:id}});
  const [UpdateSlideShow, { error }] = useMutation(UPDATE_SLIDESHOW);

  const handleEdit = async (id, slideIds,ssName) => {
    if(id){
      const response = await UpdateSlideShow({variables:{slideshowId:id,slides:slideIds,comments:'',slideshowName:ssName}});
      console.log(response);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
//   useEffect(() => {
//     setListState([...props.slides]);
//   }, [props.slides]);
  const navigate = useNavigate();
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const authContext = {
    headers: { Authorization: `Bearer ${token}` },
  };
    // const [addSlideshow, { error }] = useMutation(ADD_SLIDESHOW);
    if (token === null) navigate('/login');
    const { loading, error:loadingError, data } = useQuery(GET_ALL_SLIDES);
    const handleCreate = async (ids) => {
    //   const createShow = await addSlideshow({variables:{slides:[...ids],slideshowName:formState.slideshowName},context: authContext})
    //   props.addSlideshow(createShow.data.addSlideshow);
    }
    if (loading) return <p>Loading...</p>;
    if (loadingError) return <p>Error: {loadingError.message}</p>;
    if (slideLoading) return <p>Loading...</p>;

  return (
    <div className="container"> 
      <h1>Update Slide Show</h1>
      <ThumbnailList images={data.getAllslides} selectedImages={slideData.getSlideshow} handleEdit={handleEdit} btn={'Update'} handleCreate={handleCreate} handleChange={handleChange} onFileChange={props.onFileChange}/>

     </div>
  );
};

export default UpdateSlideShow;