import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench,faCheck,faHospital } from '@fortawesome/free-solid-svg-icons';

function Nav(props) {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">          
          <li className="navItem">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="navItem">
          <FontAwesomeIcon icon={faHospital} onClick={() => props.infoClicked(true)} />
            
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="navItem">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="navItem">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="navItem">
          <FontAwesomeIcon icon={faWrench} onClick={() => props.infoClicked()} />
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="navHeader">
      <h1>        
        <Link to="/">
        Demo Slideshow
        </Link>
      </h1>

      <nav>
        {showNavigation()}
        
      </nav>
    </header>
  );
}

export default Nav;
