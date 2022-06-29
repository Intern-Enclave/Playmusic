import React, { createContext, useEffect, useState } from "react";
// import { StoreContext } from "./Store";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { publicRoute } from "./routes";
import UseApi from "./API/UseApi";
// import {StoreProvider} from "./Store";

import Layout from "./Layout";
import './App.css'



export const trackContext = createContext()

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
  
      <trackContext.Provider value={listTracks}>
        <Router>
          <div className="App">
            <Routes>
              {publicRoute.map((route, index) => {
                const Page = route.component
                return (
                  // <trackContext.Provider>
                    <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
                  // </trackContext.Provider>
                )
              })}
            </Routes>
          </div>
        </Router>
      </trackContext.Provider>
  
  );
}

export default App;
