
import ThumbnailList from "../components/ThumbnailList";
import Auth from "../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_SLIDES } from '../utils/queries';
import { ADD_SLIDESHOW } from "../utils/mutations";
import React, {useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";

const CreateSlideShow = (props) => {
  const [listState, setListState] = useState([...props.slides]);
  const [formState, setFormState] = useState({slideName:''});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  useEffect(() => {
    setListState([...props.slides]);
  }, [props.slides]);
  const navigate = useNavigate();
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const authContext = {
    headers: { Authorization: `Bearer ${token}` },
  };
    const [addSlideshow, { error }] = useMutation(ADD_SLIDESHOW);
    if (token === null) navigate('/login');
    const { loading, error:loadingError, data } = useQuery(GET_ALL_SLIDES);
    const handleCreate = async (ids) => {
      const createShow = await addSlideshow({variables:{slides:[...ids],slideName:formState.slideName},context: authContext})
      props.addSlideshow(createShow.data.addSlideshow);
    }
    if (loading) return <p>Loading...</p>;
    if (loadingError) return <p>Error: {loadingError.message}</p>;
  return (
    <div className="container"> 
      <h1>Create Slide Show</h1>
      <ThumbnailList images={listState} handleCreate={handleCreate} handleChange={handleChange}/>

     </div>
  );
};

export default CreateSlideShow;
