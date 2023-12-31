import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_ALL_SLIDES } from '../../utils/queries';

const SlideComponent = (props) => {
    // const { loading, error, data } = useQuery(GET_ALL_SLIDES);
    const [listState, setListState] = useState([...props.slides]);
    const [imageRatios, setImageRatios] = useState({});
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    useEffect(() => {
      setListState([...props.slides]);
    }, [props.slides]);
  return (
    <div className="slide-container">
      {listState.length === 0 ? (
        <p>No slides available</p>
      ) : (
        listState.map((slide) => (
          <div key={slide._id} className="slide-thumbnail">
           <img src={`/uploads/${slide.filename}.${slide.extname}`} alt={slide.filename} />
            <p>{slide.filename}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SlideComponent;
