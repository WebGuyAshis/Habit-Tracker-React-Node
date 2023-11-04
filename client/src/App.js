import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

// import axios from "axios";
import Overview from "./components/Overview";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import HabitDetail from "./components/HabitDetail";
// import { useSelector } from "react-redux";
// import AccessDeniedPage from "./components/AccessDeniedPage";
// Move to .env
// let baseURL = "http://localhost:8080";


// const ContextData = createContext();
function App() {
  // let navigate = useNavigate();

  // const userData = useSelector((state)=>state.userAuth);
  // console.log("User Data:", userData);


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
        </Routes>
      </Router>
    </div>
    // </ContextData.Provider>
  );
}

export default App;
// export {ContextData} ;
