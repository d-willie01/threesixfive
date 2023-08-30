import React from 'react';
import './Home.css';
import Calendar from '../components/Calendar';
import { useNavigate } from "react-router-dom";

function Home(props) {




const todayDate = new Date();

function getMonthString() {

    

  }

  const day = todayDate.getDate()
  const month = todayDate.getMonth()
  const year = todayDate.getFullYear()
    return (
        <div className='wrapper'>

      <h1>ThreeSixFive</h1>
  
      <h3> Today is: {day}.{month}.{year}</h3>
  
      <Calendar/>

      <div>
        <h3>
          HOW IT WORKS:
        </h3>
        <h4>
          - Click on a Date to see the POSTS from that DATE 
        </h4>

        <h4>
          - You can only LOOK & LIKE posts from a PAST date 
        </h4>

        <h4>
          - You can POST & UPCOUNT on todays date, which is highlighted above
        </h4>
      </div>
  
      </div>

      
    );
}

export default Home;