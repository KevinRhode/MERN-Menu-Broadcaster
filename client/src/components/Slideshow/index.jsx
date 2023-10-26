import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import image from '/GC.png';
import image2 from '/MG.jpg';
import image3 from '/FBgive.png';
import image4 from '/food1.jpg';
import '../../App.css';
// import {ImageBackground} from 'react-native';
const images = [image2,image, image3, image4]
const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 10000;

function Slideshow(props) {
  const { id } = useParams();
//   const { loading, data } = useQuery(GET_SLIDESHOW, {
//     variables: { getSlideshowById: id },
// });
 const show = [];
  props.images.forEach(element => {
    element.slides.forEach(element2 => {
      show.push(element2)
    })
  });
 
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === show.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        
        {show.map((background, index) => (
          <div
            className="slide"
            key={index}           
            // style={{ backgroundImage:`url(${background})`,backgroundSize:'cover'  }}

          >
           
            <img src={`/uploads/${background.filename}.${background.extname}`} alt={background.filename}
                />
          </div>
        ))}
      </div>

     
    </div>
     
   </>
  );
}

export default Slideshow;
