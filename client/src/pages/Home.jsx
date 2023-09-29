import { useQuery } from "@apollo/client";
import { QUERY_USER, GET_ALL_SLIDES } from '../utils/queries';
import Dashboard from "./Dashboard";
import Nav from "../components/Nav";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading, error, data } = useQuery(GET_ALL_SLIDES); 
  
  const navigate = useNavigate();


if (userLoading) return <p>Loading User Infomation...</p>;

if (auth.loggedIn() === false) {
  navigate('/login');  
}
if (loading) return <p>Loading Slide Infomation...</p>;

if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
    <Nav/>
    <Dashboard slides={data.getAllslides}/>
    </>
  );
};

export default Home;
