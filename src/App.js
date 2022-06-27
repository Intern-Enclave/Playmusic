import React, { createContext, useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { publicRoute } from "./routes";
import UseApi from "./API/UseApi";

import Layout from "./Layout";
import './App.css'



// const trackContext = createContext()
// console.log(trackContext)

function App() {
  const [listTracks,setListTracks] = useState([])

  useEffect(() => {
    const getAll = async() =>{
      try{
        const response = await UseApi.getAllTracks();
        setListTracks(response);
      }catch(error){
        console.log('error get list tracks: ', error)
      }
    }

    getAll()
  }, [])

  return (
  
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component
            return (
              // <trackContext.Provider>
                <Route key={index} path={route.path} element={<Layout data={listTracks}><Page data={listTracks}/></Layout>} />
              // </trackContext.Provider>
            )
          })}
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;
