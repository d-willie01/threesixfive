import React, {useState} from 'react'
import {db} from '../firebaseConfig';
import { collection, addDoc, getFirestore, setDoc, doc } from "firebase/firestore"; 
import {AiOutlineHome} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


export const Form = () => {

    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
   

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
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const DATA = 
        {
          name: name,
          day: day,
          month: month,
          year: year,
          text: text,
          image: "",
          topCount: 0
        }
        try {
          const response = await addDoc(collection(db, `${year}`,), DATA);
          console.log(response);
          alert("Post sent!");
        } catch (error) {
          console.log(error)
        }
           
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

        
          <button style={{height: 50, width: 100, borderRadius:50, border: "none"}}>Add an Image</button> 
           
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
          <button style={{height: 50, width: 100, borderRadius:50, border: "none"}} onClick={sendData}>Submit</button>


        </div>
        
    </div>
    
  )
}
