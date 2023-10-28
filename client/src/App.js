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

  let baseUrl = "http://localhost:8080";

  // const fetchUserDetail=async()=>{
  //   let response = await axios.get(`${baseUrl}/api/v1/user/active_user`)
  //   console.log("User:", response.data);
  // }

  // if(userData.user === null){
  //   fetchUserDetail();
  // }

  return (
    // <ContextData.Provider value={{openCreateHabit,setOpenCreateHabit}}>
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Overview />} />
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>

          {/* <Route path="/user/home" element={userData.user?<Home/>:<AccessDeniedPage/>}/> */}
          <Route path="/user/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    // </ContextData.Provider>
  );
}

export default App;
// export {ContextData} ;
