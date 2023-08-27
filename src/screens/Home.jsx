import React from 'react';
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
        <div>

      <h1>Hello Welcome to ThreeSixFive!</h1>
  
      <h3> Today is: {day}.{month}.{year}</h3>
  
      <Calendar/>
  
      </div>
    );
}

export default Home;