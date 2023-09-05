import React from 'react'

export const TopPost = (data) => {
   
    console.log(data.data);

    const postInfo = data.data;

   

    if (postInfo.image === "")
    {
        return (
            <div style={{
                borderBottom:'2px solid black',
                 height: 125,
                 width: 300,
                 margin: 10
               }}>
                <div style={{
                   display:"flex"
                 }}>
                 <h5 style={{margin:5}}>UPCOUNTER: {postInfo.topCount} |</h5>
        
                 <div >
                     <button  style={{margin:5}}>UP</button>
                     </div>
            
                 <h5 style={{margin:5}}>{postInfo.month}.
                 {postInfo.day}.{postInfo.year}</h5>
                 </div>
                  <div>
                   <h4 style={{margin:5}}>{postInfo.name}:</h4> {postInfo.text}
                   </div>
                     
               </div>
          )
    }
    else
    {
        return (
            <div style={{
                borderTop:'2px solid black',
                borderBottom:'2px solid black',
                 height: 450,
                 width: 400,
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
                   src= {postInfo.image}/>
            
                 </div>
                   
                 <div style={{
                   display:"flex"
                 }}>
                 <h5 style={{margin:5}}>UPCOUNTER: {postInfo.topCount} |</h5>
           
                 
                 <h5 style={{margin:5}}>{postInfo.month}.
                 {postInfo.day}.{postInfo.year}</h5>
                
           
           
                
                 <h5 style={{margin:5}}>{postInfo.date}</h5>
                 
                 
                 </div>
               
            
                 <h4 style={{margin:5,}}>{postInfo.name}:</h4> {postInfo.text}
           
                 <div style={{margin: 5}}>
                       <h5>
                       {postInfo.hour}
                       </h5>
                      </div>
                   
           
             </div>
        )
    }
 
}
