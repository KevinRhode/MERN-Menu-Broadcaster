
import ThumbnailList from "../components/ThumbnailList";
import Auth from "../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_SLIDES } from '../utils/queries';
import { ADD_SLIDESHOW } from "../utils/mutations";

const CreateSlideShow = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const authContext = {
    headers: { Authorization: `Bearer ${token}` },
  };
    const [addSlideshow, { error }] = useMutation(ADD_SLIDESHOW);
    const { loading, error:loadingError, data } = useQuery(GET_ALL_SLIDES);
    const handleCreate = async (ids) => {
      const createShow = await addSlideshow({variables:{slides:[...ids]},context: authContext})
    }
    if (loading) return <p>Loading...</p>;
    if (loadingError) return <p>Error: {loadingError.message}</p>;
  return (
    <div className="container"> 
      <ThumbnailList images={data.getAllslides} handleCreate={handleCreate}/>

     </div>
  );
};

export default CreateSlideShow;
