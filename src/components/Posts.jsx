import React from 'react'
import {DATA} from "../data/mockPosts"



export const Posts = () => {

  /*
  renderArray takes in an array of objects and begins creating
  instances of components based on the amount of 
  objects in the array. This can then be used for dot 
  notation in the components to incorporate dynaimc data
  within components
  */
  const renderArray = DATA.map((index) =>{

    //this returns a custom component to match with
    //post data in the database
    return(
       <div style={{
    borderBottom:'2px solid black',
     height: 450,
     width: 450,
     margin: 10
   }}>

     <div style={{
       height: 300,
       width: '100%',
       
     }}>
       <img style={{
         
         width:'100%',
         height: 300,
         borderRadius:40
       }}
       src= {index.image}/>

     </div>

     <div style={{
       display:"flex"
     }}>
     <h5 style={{margin:5}}>UPCOUNTER: 200 |</h5>

     <h5 style={{margin:5}}>{index.date}</h5>
     </div>
   

      <div>
       <h4 style={{margin:5}}>{index.name}:</h4> {index.text}
       </div> 
     





   </div>
    )
  })

  return (
    <div >
      {renderArray}
    </div>
  )
}


