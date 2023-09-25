import FileUploadComponent from "../components/FileUploadComponent";
import SlideComponent from "../components/Slide";
import Slideshow from "../components/Slideshow";

const Home = () => {
  return (
    <div className="container">
     <div>
     <p>Home</p>
     <FileUploadComponent/>
     <SlideComponent/>
      </div>
     <div>
     <Slideshow/>
     </div>
    
    </div>
  );
};

export default Home;
