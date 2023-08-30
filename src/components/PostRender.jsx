import React, {useState} from 'react'

export const PostRender = (index) => {
    const [topCount, setTopCount] = useState(index.data.topCount);
    const [buttonOn, setButtonOn] = useState(false)
const upTheCount = () =>{

    setTopCount(topCount + 1);
    setButtonOn(true);
    
}

if (index.data.image === "")
{

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
         <h5 style={{margin:5}}>UPCOUNTER: {topCount} |</h5>

         <div onClick={upTheCount}>
             <button disabled={buttonOn} style={{margin:5}}>UP</button>
             </div>
    
         <h5 style={{margin:5}}>{index.month}</h5>
         </div>
          <div>
           <h4 style={{margin:5}}>{index.data.name}:</h4> {index.data.text}
           </div>
           <div style={{margin: 5}}>
                   <h5>
                   {index.data.hour}
                   </h5>
                  </div>   
       </div>


)

} else {
    return (
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
               src= {index.data.image}/>
        
             </div>
               
             <div style={{
               display:"flex"
             }}>
             <h5 style={{margin:5}}>UPCOUNTER: {topCount} |</h5>
       
             <div onClick={upTheCount}>
             <button disabled={buttonOn} style={{margin:5}}>UP</button>
             </div>
       
       
            
             <h5 style={{margin:5}}>{index.data.date}</h5>
             
             
             </div>
           
        
             <h4 style={{margin:5,}}>{index.data.name}:</h4> {index.data.text}
       
             <div style={{margin: 5}}>
                   <h5>
                   {index.data.hour}
                   </h5>
                  </div>
               
       
         </div>
      )
}
  
}
