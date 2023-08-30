import React, {useEffect, useState} from 'react'
import {db} from '../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";



export const Posts = ({clickedDay, clickedMonth, clickedYear}) => {

const [queryData, setQueryData] = useState([]);

//query to find posts with the correct date

useEffect(() =>{


  const querySearch = async() => {
    console.log(clickedDay)
    const yearRef = collection(db, "2023")
    const q = query(yearRef, where("day", "==", clickedDay), where("month", "==", clickedMonth), where("year", "==", clickedYear))
  
    try {
      const response = await getDocs(q)
      const dataArr = [];
  
      response.forEach((doc) => {
        const data = doc.data();
        dataArr.push(data);
      })
      console.log(dataArr)
      setQueryData(dataArr);
      
    } catch (error) {
      console.log(error)
    }
  
    console.log(queryData);
  
    //console.log(day);
  }

  querySearch()



},[])









  /*
  renderArray takes in an array of objects and begins creating
  instances of components based on the amount of 
  objects in the array. This can then be used for dot 
  notation in the components to incorporate dynaimc data
  within components
  */
  const renderArray = queryData.map((index) =>{

    //this returns a custom component to match with
    //post data in the database
    console.log(index.image)


    //param to check if image is present, if not, 
    //giant image dive is taken out of post
    if (index.image === "" ) {
    return(
      <div style={{
        borderBottom:'2px solid black',
         height: 125,
         width: 450,
         margin: 10
       }}>
    
    
         <div style={{
           display:"flex"
         }}>
         <h5 style={{margin:5}}>UPCOUNTER: {index.topCount} |</h5>
    
         <h5 style={{margin:5}}>{index.date}</h5>
         </div>
       
         
          <div>
           <h4 style={{margin:5}}>{index.name}:</h4> {index.text}
           </div>

           <div style={{margin: 5}}>
            <h5>
            {index.hour}
            </h5>
           </div>
         
    
         
    
    
    
       </div>
    )
    } else {

      return(
  <div style={{
     borderBottom:'2px solid black',
      height: 450,
      width: 300,
      margin:10
    }}>
 
      <div style={{
        height: 300,
        width: '100%',
        
      }}>
        <img style={{
          
          width:'100%',
          height: 300,
          borderRadius:100,
          objectFit:"contain"
        }}
        src= {index.image}/>
 
      </div>
        
      <div style={{
        display:"flex"
      }}>
      <h5 style={{margin:5}}>UPCOUNTER: {index.topCount} |</h5>
 
      <h5 style={{margin:5}}>{index.date}</h5>
      </div>
    
 
      <h4 style={{margin:5,}}>{index.name}:</h4> {index.text}

      <div style={{margin: 5}}>
            <h5>
            {index.hour}
            </h5>
           </div>
        

  </div>
     )

    }
    
  })

  return (
    <div >
      {renderArray}
    </div>
  )
}


