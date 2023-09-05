import React, {useState, useEffect}from 'react';
import db from '../firebaseConfig';
import { useLocation } from 'react-router-dom';
import { checkDate } from '../utils/functions';
import { Posts } from '../components/Posts';
import { useNavigate } from "react-router-dom";
import {AiOutlineHome} from 'react-icons/ai'

const Feed = () =>{

    const [isToday, setIsToday] = useState(0);
    const {state} = useLocation();
    const clickedDate = new Date(state.clickedDate);
    const clickedDay = clickedDate.getDate();
    const clickedYear = clickedDate.getFullYear();
    const clickedMonth = clickedDate.getMonth();

    const today = new Date();
    
    
let navigate = useNavigate(); 
   



useEffect(() => {
    
      
      setIsToday(checkDate(today, clickedDate));

}, [])

   const todayRender = today.toDateString();
   const clickDateRender = clickedDate.toDateString();

    function formScreen() {
        
        navigate('/form')
        
    }
    function sendHome() {
        
        navigate('/')
        
    }
   

    if(isToday === 1) return (
        <div>
            <div style={{backgroundColor: 'rgba(120, 70, 70, 0.637)',
        border:'1px solid black'}}>
            <h1>Welcome to Today!</h1>

            <h2>It is currently: {todayRender}</h2>

            <div>
                <h4>You can either, <button onClick={formScreen}>POST</button> ,  or just scroll to see the latest posts from today!</h4>
                <div onClick={sendHome}>
                <AiOutlineHome size={40} /> (back to calendar)
                </div>
                    
                
            </div>
            </div>


             {/* div to place feed component */}
             <div style={{
                
                border:'1px solid black',
                backgroundColor: 'rgba(179, 118, 118, 0.637)',
                width:'100%',

                display:"flex",

           
                

             }}
             >

             <Posts 
             clickedDay={clickedDay} 
             clickedMonth={clickedMonth} 
             clickedYear={clickedYear}
             />

          
            
                
            </div>
           
            
        </div>
    ) 
    if (isToday === 0 ) return(
        
        <div style={{backgroundColor: 'rgba(120, 70, 70, 0.637)',
        border:'1px solid black'}}
        >
            <h1>Welcome to the past</h1>
            <h2>This date was: {clickDateRender}</h2>

            <div>
                <h4>Scroll to check out posts from this date in the past below!</h4>
            </div>

            <div onClick={sendHome}>
                <AiOutlineHome size={40} /> (back to calendar)
                </div>

            {/* div to place feed component */}
            <div style={{
                
                border:'1px solid black',
                backgroundColor: 'rgba(179, 118, 118, 0.637)',
                width:'100%',

                

                display:"flex",

            
                

             }}>

            <Posts 
             clickedDay={clickedDay} 
             clickedMonth={clickedMonth} 
             clickedYear={clickedYear}
             />


                
            </div>
        </div>
    )
    if (isToday === 2 ) return(
        
        <div style={{backgroundColor: 'rgba(120, 70, 70, 0.637)',
        border:'1px solid black',
        height:1000}}>
            
            <h1>Welcome to the Future</h1>

            <div>
                Gotta wait for the past to catch up!
            </div>
            <div onClick={sendHome}>
                <AiOutlineHome size={40} /> (back to calendar)
                </div>
        </div>
    )
}

export default Feed;