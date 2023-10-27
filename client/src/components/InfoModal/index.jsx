// components/EditEndpointModal.js
import { useState } from "react";
import _ from "lodash";
import ReactMarkdown from 'react-markdown';
import "./infoModal.css";

const InfoModal = ({ info, onClose }) => {
    const markdownContent = `
    ## Uploading Slides
    
    (please compress images before uploading, currently being implemented to reduce bandwidth and slow loading on internal network) compressnow.com
    Login
    Choose File ( must be smaller than 9MB )
    press upload - you should then see the picture added to the available slides in create slide show below.
    
    ## Creating a Slide Show
    
    Enter a name for the slide show
    select the slides you wish to have in the show by clicking on them. they will have a highlighted blue edge to tell you, you have them selected. 
    IMPORTANT - the order in which you select the slides is the order in which they play
    once set, and name entered press create slideshow 
    the slideshow should then be listed in the create endpoint list below
    
    ## Edit Slide Show
    
    if you wish to edit a slide show, click the wrench icon to the right of the slide show name under create endpoint. 
    This will allow you to change a slide show. Select the wrench, this will load a page and let you reselect the slides you want. 
    Again - order matters.
    
    once set hit update slideshow. you will need to hit back to get back to the home at the moment. the slide show should now be updated.
    
    Navigating to Endpoints -
    LG TV -
      using the TV's web browser app. (TV firmware should be updated to at least 5.0.x)
    
      current address: 192.168.3.84:3000/ss/1
    
      1 - being the deviceID of the endpoint you want the TV to display.
    
      Front Left Entrance Tv's 1
      Front Left Hanging Tv 3
      Front Right Hanging Tv 4
    
      once page is loading, press ok on the TV remote for the navigation bar to hide itself.
    
      POS Menu Endpoints: (this is to be done on the PC, using google chrome, and setting the page to fullscreen with f11.)

       6 - Reg Prices, w/ Card Fee, buffet
       7 - Works Best Deal Package
      `;

  return (
    <div className="modal">
      <div className="modal-content" onClick={onClose}>
        <h2>Informational</h2>     
        <ReactMarkdown>
          {markdownContent}
        </ReactMarkdown>       
                
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default InfoModal;
