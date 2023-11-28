import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

// import axios from "axios";
import Overview from "./components/Overview";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import HabitDetail from "./components/HabitDetail";


import {notification } from 'antd';
import { useDispatch } from "react-redux";
import { showNotification } from "./actions";
import Profile from "./components/Profile";
import Community from "./components/Community";
import Leaderboard from "./components/Leaderboard";



// const ContextData = createContext();
function App() {
  const dispatch = useDispatch();

  const openNotification = (type, title, description) => {
    notification[type]({
      message: title,
      description,
    });
  };

  dispatch(showNotification(openNotification));


  return (
    // <ContextData.Provider value={{openCreateHabit,setOpenCreateHabit}}>
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Overview />} />
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>

          {/* <Route path="/user/home" element={userData.user?<Home/>:<AccessDeniedPage/>}/> */}
          <Route path="/user/home" element={<Home/>}/>
          <Route path="/user/habit-detail" element={<HabitDetail/>}/>
          <Route path="/user/community" element={<Community/>}/>
          <Route path="/user/profile" element={<Profile/>} />
          <Route path="/user/leaderboard" element={<Leaderboard/>}/>
        </Routes>
      </Router>
    </div>
    // </ContextData.Provider>
  );
}

export default App;
// export {ContextData} ;
