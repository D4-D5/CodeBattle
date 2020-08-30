import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../assets/images/compete-friends-new-01-01.svg'
import image2 from '../assets/images/stanger-vs-01-01-01-01.svg'
import image3 from '../assets/images/practice-friends-01-01.svg'
import image4 from '../assets/images/practice-stranger-01-01.svg'
import HomeMainCard from './homeMainCard.js';
import {useHistory} from 'react-router-dom'
import '../css/homeCards.css'

import JoinContestPopup from './joinOrCreatePopup';

const { v4: uuidv4 } = require('uuid');


function HomeCards() { 

  const history = useHistory();
  const [showJoinContest, setShowJoinContest] = useState(false);
  const handleShowJoinContest = () => setShowJoinContest(true);
  const handleHideJoinContest = () => setShowJoinContest(false);
  const createContest = () => {
    setShowJoinContest(true);
  
  }

  const routeChange = () => {

    createContest()
    
    
}
    return (
      <div class="container homeCards">
        <div class="row mt-5">
          <div class="col-lg-3 col-md-6 col-12 mb-3">
            <HomeMainCard img={image3} title={"Unrated"} content={"Lorem Ipsum is simply dummy text from the printing and type industry"} btnState={"Practice with Friends"} disabled={false} routeChange={routeChange}/>
          </div>

          <div class="col-lg-3 col-md-6 col-12 mb-3">
            <HomeMainCard img={image1} title={"Rated"} content={"Lorem Ipsum is simply dummy text from the printing and type industry"} btnState={"Compete with Friends"} disabled={true} routeChange={routeChange}/>
          </div>

          <div class="col-lg-3 col-md-6 col-12 mb-3">
            <HomeMainCard img={image4} title={"Unrated"} content={"Lorem Ipsum is simply dummy text from the printing and type industry"} btnState={"Practice with Others"} disabled={true} routeChange={routeChange}/>
          </div>

          <div class="col-lg-3 col-md-6 col-12 mb-3">
            <HomeMainCard img={image2} title={"Rated"} content={"Lorem Ipsum is simply dummy text from the printing and type industry"} btnState={"Compete with Others"} disabled={true} routeChange={routeChange}/>
          </div>
        </div> 

        <JoinContestPopup showJoinContest={showJoinContest} handleShowJoinContest={handleShowJoinContest} handleHideJoinContest={handleHideJoinContest}/>
      </div>

    );
  }
  
  export default HomeCards;