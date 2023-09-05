import React, {useState, useEffect} from 'react'
import {db, storage} from '../firebaseConfig';
import { 
  collection, 
  addDoc,
  setDoc, 
  Timestamp,
  doc
   } from "firebase/firestore";
import {AiOutlineHome} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Form = () => {
  
  const teatime = new Date();
  const rt = teatime.getHours();
  

 


    //useState constants to update variables based on user
    //input
    let navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageURI, setImageURI] = useState();
    

  useEffect(() => {
    if (!image) {
        setImageURI(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(image)
    setImageURI(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [image])

const filePicker = e => {
  if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined)
      return
  }

  // I've kept this example simple by using the first image instead of multiple
  setImage(e.target.files[0])
}



  //function that beings upload process
  const uploadPost = async() => {
    setActive(true)
    //first date is registered to keep everything consistant
    const date = new Date();

    //variabled are then registered from the date
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const time = date.getHours();

    
    function realTime(time) {
      console.log(time)
      if (time <= 12) return time + 'am';
      else {
        return(
          (time - 12) + "pm"
        )
      }
    }
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
    console.log(date);
      const DATA = 
      {
        name: name,
        day: day,
        month: month,
        year: year,
        hour: realTime(time),
        text: text,
        image: "",
        topCount: 0,
        deleteCode: 12345,
        id: `${date}`
        
      }
      try {
        //function to deposit the document into db, taking in three arguments
        //1: a fireStore reference, in this case db imported from firebaseconfig file
        //2: name of the collection being placed in, in this case the year
        //3: finally the data is the last argument
        const response3 = await setDoc(doc(db, `${year}`, `${date}`), DATA);
        console.log(DATA)
        
        
        //alerting user of post sent
        alert("Post sent!");

        //nevigation back to home
        navigate("/");
      } catch (error) {
        console.log(error)
        alert(error)
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
          deleteCode: 12345,
          hour: realTime(time),
          id: date
        }
        try {
          
          //function can now be ran to add the full document including user title and
          //description to the databse
          const response3 = await setDoc(doc(db, `${year}`,`${date}`), DATA2);
          console.log(response3);
          alert("Post sent!");
          navigate("/");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
      
  
  
    } catch (error) {
  
      console.log(error);
      alert(error);
  
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

    <div style={{
      display:"flex", 
      justifyContent:"center", 
      backgroundColor:'rgba(179, 118, 118, 0.637)',
      height: 700
    }}>

    <div style={{margin:20, height: 50}} onClick={sendHome}>
      <AiOutlineHome size={30}/>
    </div>
      <div>
      <h2>Hello, create a POST here!</h2>

      
        <button 
        style=
          {{height: 50, 
          width: 100, 
          borderRadius:50, 
          border: "none", 
          backgroundColor:"white"
          }}
        ><input 
        style={{}}
        type='file'
        accept="image/png, image/jpeg" 
        onChange={filePicker}></input>
        
        </button> 

          {imageURI && <img src={imageURI} alt="Selected" style={{height:300, width:'100%', borderRadius:35}}/>}
        
         
        <div>

        <input
        placeholder='Title...'
        maxLength={15}
        type='text'
        style={{border:'2px solid grey', width: 120, height: 30, borderRadius:50, textAlign:"center", marginTop:20}}
        onChange={e => setName(e.target.value)}
        />

          
        </div>

        

        <div>

        <textarea
        placeholder='Description.....'
        rows={3}
        cols={30}
        maxLength={100}
        style={{border:'2px solid grey', marginTop:20 }}
        onChange={e => setText(e.target.value)}
        />

        </div>

       


          <p></p>
        <button disabled={active} style={{backgroundColor:"white", height: 50, width: 100, borderRadius:50, border: "none"}} onClick={uploadPost}>Submit</button>


      </div>
      
  </div>
  )

}
