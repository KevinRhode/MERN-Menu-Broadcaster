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
const delay = 5000;

function Slideshow() {
  const { id } = useParams();
//   const { loading, data } = useQuery(GET_SLIDESHOW, {
//     variables: { getSlideshowById: id },
// });

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
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
    <div className="slideshow" style={{display:'flex',flexGrow:'1'}}>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)`, flexGrow:'1' }}
      >
        {images.map((background, index) => (
          <div
            className="slide"
            key={index}           
            style={{ backgroundImage:`url(${background})`,backgroundSize:'cover'  }}

          >
           {/* {console.log(background)} */}
           {/* <p>Testing</p> */}
            {/* <img src={background}  style={{ width: "100%", height: "auto"}} /> */}
          </div>
        ))}
      </div>

     
    </div>
     <div className="slideshowDots" style={{position:'absolute'}}>
     {images.map((_, idx) => (
       <div
         key={idx}
         className={`slideshowDot${index === idx ? " active" : ""}`}
         onClick={() => {
           setIndex(idx);
         }}
       ></div>
     ))}
   </div>
   </>
  );
}

export default Slideshow;
