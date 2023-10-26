import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import Overview from "./components/Overview";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import AccessDeniedPage from "./components/AccessDeniedPage";
// Move to .env
axios.defaults.baseURL = "http://localhost:8080";

// const ContextData = createContext();
function App() {

  const userData = useSelector((state)=>state.userAuth);
  console.log("User Data:", userData);

  // const [data, setData] = useState("");
  
  // For opening and Closing of Create Habit box
  // const [openCreateHabit, setOpenCreateHabit] = useState(false);


  // hitting route of node js
  // console.log("Initial Data:");
  // useEffect(() => {
  //   axios
  //     .get("/api/v1")
  //     .then((response) => {
  //       console.log(response.data);
  //       setData(response.data);
  //     })
  //     .catch((err) => setData("Error Fetching data from Api!"));
  // }, []);

  return (
    // <ContextData.Provider value={{openCreateHabit,setOpenCreateHabit}}>
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Overview />} />
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/user/home" element={userData.user?<Home/>:<AccessDeniedPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    // </ContextData.Provider>
  );
}

export default App;
// export {ContextData} ;
