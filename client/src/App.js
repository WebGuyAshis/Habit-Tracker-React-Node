import './App.css';
import { useEffect,useState } from 'react';

import axios from 'axios'
// Move to .env
axios.defaults.baseURL = 'http://localhost:8080';

function App() {

  const [data, setData] = useState('');
  
  // hitting route of node js
  console.log("Initial Data:");
  useEffect(()=>{
    axios.get('/api')
    .then((response)=>{
      console.log(response.data);
      setData(response.data)
    })
    .catch(err=>setData("Error Fetching data from Api!"))
  },[])

  return (
    <div className="App">
      <h1>Data Received: {data}</h1>
    </div>
  );
}

export default App;
