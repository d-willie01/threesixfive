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

    //useState constants to update variables based on user
    //input
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageURI, setImageURI] = useState();
    
   
  
  //function to set the image to the image state variable


  //issue here is image variable lags in creation, so it will skip the condition
  //thinking no image is there
  const filePicker = (event) => {
      
      setImage(event.target.files[0]);

      if (image) {
        console.log('first')
        const reader = new FileReader();
  
        reader.onload = (e) => {
          setImageURI(e.target.result);
        };
  
        reader.readAsDataURL(image);
      }
      console.log(imageURI);
      
  }


  //function that beings upload process
  const uploadPost = async() => {

    //first date is registered to keep everything consistant
    const date = new Date();

    //variabled are then registered from the date
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    //a reference is created to the 1: storage space on firebase
    // and 2: the name that you want to call the file
    //in this case we want the picture to be called whatever the date is
    const reference = ref(storage, `${date}`)
    
    //next a blob is created from the file the was uploading from the user
    //a blob is a base64 data output of an image that most siftware can
    //process and read
    console.log(image.uri);
    const blob = new Blob([image], {type : `${image.type}`})
   
    //meta data property sent with image to let the storage know what
    //type of file it is storing
    const metadata  = {
      contentType : `${image.type}`
    };

  //this checks if the image variable had been changed from default,
  //which would indicate a user chose a file, in this case they
  //did not
  if (image === ""){

    

    //deta object being placed in collection
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
        //function to deposit the document into db, taking in three arguments
        //1: a fireStore reference, in this case db imported from firebaseconfig file
        //2: name of the collection being placed in, in this case the year
        //3: finally the data is the last argument
        const response3 = await addDoc(collection(db, `${year}`,), DATA);
        
        
        //alerting user of post sent
        alert("Post sent!");

        //nevigation back to home
        navigate("/");
      } catch (error) {
        console.log(error)
      }

    


  }
  //else fires if a file is present
  else{

    
    try {
      
      //function that uploads blob folder to storage, taking the
      //referece to the place, blob, and the metadata as arguments
      const response = await uploadBytes(reference, blob, metadata);
      console.log(response)
  
      //this function waits till the above function is done and then
      //runs a function using the same reference to retrive a downloadable
      //link to the photo
      const response2 = await getDownloadURL(reference)
   
      //param checking if response2 has been received yet, so the function does
      //not move to quickly
      if(response2){

        //second data set being set with the picture present in the response2
        //URL format
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
          
          //function can now be ran to add the full document including user title and
          //description to the databse
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

    const sendHome = () => {
      let path = `/`; 
      navigate(path)
    }
    
    const seeImage = () => {

      console.log(image)

    }


  return(

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

          {imageURI && <img src={imageURI} alt="Selected" style={{height:300, width:'100%', borderRadius:35}}/>}
        
         
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
