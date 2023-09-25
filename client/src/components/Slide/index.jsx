import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_SLIDES } from '../../utils/queries';

const SlideComponent = () => {
    const { loading, error, data } = useQuery(GET_ALL_SLIDES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="slide-container">
      {slides.length === 0 ? (
        <p>No slides available</p>
      ) : (
        slides.map((slide) => (
          <div key={slide._id} className="slide">
            {/* Assuming the files are served from a /slides/ folder on the server */}
            <img src={`/uploads/${slide.filename}${slide.extname}`} alt={slide.filename} />
            <p>{slide.filename}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SlideComponent;
