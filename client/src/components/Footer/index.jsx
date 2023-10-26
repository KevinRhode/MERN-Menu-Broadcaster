import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navButtonStyle = {
    margin: "0 8px",
    padding: "10px 20px",
    color: "white",
    textDecoration: "none",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "4px",
    display: 'flex',
    justifyContent:'center',
    maxWidth:'400px'
    
  };

  return (
    <footer >
      <div className="footer">
        {location.pathname !== '/home' && (
          <Link style={navButtonStyle} onClick={() => navigate(-1)}> Go Back </Link>         // <button
            
        )}
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          {' '}
          </span>{' '}
          by Kevin Rhode
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
