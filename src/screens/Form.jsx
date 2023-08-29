import React, {useState} from 'react'
import {db, storage} from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
   } from "firebase/firestore";
   
import {AiOutlineHome} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const Form = () => {

    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");
   
  

  const filePicker = (event) => {
      setImage(event.target.files[0]);
      console.log(image);
      
  }

  const uploadPost = async() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const reference = ref(storage, `${date}`)
    console.log(image);
    const blob = new Blob([image], {type : `${image.type}`})
    console.log(blob);

    const metadata  = {
      contentType : `${image.type}`
    };

  if (image === ""){

    console.log('no pic');
    
      const DATA = 
      {
        name: name,
        day: day,
        month: month,
        year: year,
        text: text,
        image: "",
        topCount: 0,
        deleteCode: 12345
      }
      try {
        console.log(imageURL);
        const response3 = await addDoc(collection(db, `${year}`,), DATA);
        console.log(response3);
        alert("Post sent!");
        navigate("/");
      } catch (error) {
        console.log(error)
      }

    


  }
  else{

    console.log('yes pic')
    try {
    
      const response = await uploadBytes(reference, blob, metadata);
      console.log(response)
  
      
      const response2 = await getDownloadURL(reference)
   
  
      if(response2){
        const DATA2 = 
        {
          name: name,
          day: day,
          month: month,
          year: year,
          text: text,
          image: `${response2}`,
          topCount: 0,
          deleteCode: 12345
        }
        try {
          console.log(imageURL);
          const response3 = await addDoc(collection(db, `${year}`,), DATA2);
          console.log(response3);
          alert("Post sent!");
          navigate("/");
        } catch (error) {
          console.log(error)
        }
      }
      
  
  
    } catch (error) {
  
      console.log(error);
  
    }
    
  }
  
  

  
 
    
  



}



    //error happening at this function, I think 
    //there is an issue reading the instance of the database and
    //firetore, have to keep playing the with the config and the
    //way you not only call it to this file, but insert the doc\


    /*
      Error happened because of import usage. Next time make
      sure that the db import is importing correctly, sometimes
      takes messing with both:

      export const db = blahhh
      export default db = (sometimes finniky)
    */

    const sendData = async() => {
        console.log(db)
       
        
           
    }

    const sendHome = () => {
      let path = `/`; 
      navigate(path)
    }



  return (
    <div style={{display:"flex", justifyContent:"center"}}>

      <div style={{margin:20}} onClick={sendHome}>
        <AiOutlineHome size={30}/>
      </div>
        <div>
        <h2>Hello, create a POST here!</h2>

        
          <button 
          style=
            {{height: 50, 
            width: 100, 
            borderRadius:50, 
            border: "none"
            }}
          ><input 
          style={{border: 'none'}}
          type='file'
          accept="image/png, image/jpeg" 
          onChange={filePicker}></input>
          
          </button> 
           
          <p>Add your name:</p>

          <input 
          style={{border:'2px solid grey', width: 300, height: 50, borderRadius:50, textAlign:"center" }}
          onChange={e => setName(e.target.value)}
          />

          <p>Add Description:</p>

          <input 
          style={{border:'2px solid grey', width: 300, height: 100, borderRadius:50, textOverflow: "clip" }}
          onChange={e => setText(e.target.value)}
          />


            <p></p>
          <button style={{height: 50, width: 100, borderRadius:50, border: "none"}} onClick={uploadPost}>Submit</button>


        </div>
        
    </div>
    
  )
}
