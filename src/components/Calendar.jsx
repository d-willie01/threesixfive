import React, { useState } from 'react';
import './Calendar.css';
import { useNavigate } from "react-router-dom";

function Calendar() {
  //intiation of navigation
  let navigate = useNavigate();
  
  

  //page changing function, takes in day parameter to 
  //have the date data after click on calendar
  const routeChange = (day) =>{
    const clickedDate = new Date(currentYear, currentMonth, day) 
    let path = `/feed`; 
    navigate(path, {state: {clickedDate}});
  }

  //initiation of date variables to use for calendar use
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const [selectedDate, setSelectedDate] = useState(null);

  //function that runs after click of date on calendar
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(day);
    console.log(`Clicked on ${clickedDate.toDateString()}`);
    //date created above and passed into the function
    //to be passed along to the next screen
    routeChange(day);
  };


  //function to create calendar
  const renderCalendar = () => {
    const calendar = [];
    const emptyCells = Array.from({ length: firstDay }, (_, index) => (
      <div key={`empty-${index}`} className="calendar-day empty" />
    ));

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth();
      const isSelected = day === selectedDate;

      calendar.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return [...emptyCells, ...calendar];
  };

  return (
    <div className="calendar-container">
      
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
}

export default Calendar;