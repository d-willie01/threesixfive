import React, {useState} from 'react'
import db from '../firebaseConfig';
import { collection, addDoc, getFirestore, setDoc, doc } from "firebase/firestore"; 
import { app } from '../firebaseConfig';
export const Form = () => {

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const date = new Date();

    //error happening at this function, I think 
    //there is an issue reading the instance of the database and
    //firetore, have to keep playing the with the config and the
    //way you not only call it to this file, but insert the doc

    const sendData = async() => {
        console.log(db)
        
        const docRef = await addDoc(collection(db, "cities"), {
            name: "Tokyo",
            country: "Japan"
          });
          console.log(docRef);
    }



  return (
    <div style={{display:"flex", justifyContent:"center"}}>
        <div>
        <h2>Hello, create a POST here!</h2>

        
          <button style={{height: 50, width: 100, borderRadius:50, border: "none"}}>Add an Image</button> 
           
          <p>Add your name:</p>

          <input style={{border:'2px solid grey', width: 300, height: 50, borderRadius:50, textAlign:"center" }}/>

          <p>Add Description:</p>

          <input style={{border:'2px solid grey', width: 300, height: 100, borderRadius:50, textOverflow: "clip" }}/>


            <p></p>
          <button style={{height: 50, width: 100, borderRadius:50, border: "none"}} onClick={sendData}>Submit</button>


         





        </div>
        
    </div>
    
  )
}
