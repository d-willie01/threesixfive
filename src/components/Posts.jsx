import React, {useEffect, useState} from 'react'
import {db} from '../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import { PostRender } from './PostRender';



export const Posts = ({clickedDay, clickedMonth, clickedYear}) => {

const [queryData, setQueryData] = useState([]);

//query to find posts with the correct date

useEffect(() =>{


  const querySearch = async() => {
    console.log(clickedDay)
    const yearRef = collection(db, "2023")
    const q = query(yearRef,
    where("day", "==", clickedDay), 
    where("month", "==", clickedMonth), 
    where("year", "==", clickedYear))
  
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
    return(
      <PostRender data={index}/>
    )
  })

  return (
    <div >
      {renderArray}
    </div>
  )
}


