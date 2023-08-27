import './App.css';
import Calendar from './components/Calendar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './screens/Home';
import Feed from './screens/Feed';
import { Form } from './screens/Form';


function App() {
 

  
  //Router for the entire app, components
  //for the actual page
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },

    {
      path:"/feed",
      element: <Feed/>
    },
    {
      path:"/form",
      element: <Form/>
    }
  ]);
  return(

   
    <RouterProvider router={router} />
   
   
   
   
   

  )

}

export default App;
