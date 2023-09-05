import React, {useEffect, useState} from 'react';
import './Home.css';
import Calendar from '../components/Calendar';
import { useNavigate } from "react-router-dom";
import { PostRender } from '../components/PostRender';
import { TopPost } from '../components/TopPost';
import { db } from '../firebaseConfig';
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";

function Home(props) {

const [data, setData] = useState([]);

const MOCKDATA = [{
  name: 'Cuz',
  day: '15',
  month: 'September',
  year: '2023',
  hour: '',
  text: "Bando playing all the way home",
  image: "",
  topCount: 0,
  deleteCode: 12345,
  id: ''
}]


  
  console.log('first')
  
useEffect(() => {
  
  const getTopPost = async() => {
    const yearRef = collection(db, "2023")
    const q = query(yearRef, orderBy('topCount', "desc"), limit(1))

    try {
      
      const response = await getDocs(q);
      const dataArray = []
      console.log(response)
      response.forEach((doc) => {
        const data = doc.data();
        dataArray.push(data);
      })
      console.log(dataArray);
      setData(dataArray)

    } catch (error) {
      
    }

  }

  getTopPost()

  },[])
  console.log(data);

  const renderTopPost = data.map((index) =>{
    return(
      <TopPost data={index}/>
    )
  })

 
const todayDate = new Date();


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

      <h2>TOP POST:</h2>

      <div
      style={{
       
        display: 'flex',
        justifyContent:"center",
        
      }}
      >
        {renderTopPost}
      </div>
  
      </div>

      
    );
}

export default Home;