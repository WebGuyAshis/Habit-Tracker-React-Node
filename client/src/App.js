import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import Overview from "./components/Overview";
import SignUp from "./components/SignUp";
// Move to .env
axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [data, setData] = useState("");

  // hitting route of node js
  console.log("Initial Data:");
  useEffect(() => {
    axios
      .get("/api/v1")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => setData("Error Fetching data from Api!"));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
