import React, { createContext, useEffect, useState } from "react";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { publicRoute } from "./routes";
import UseApi from "./API/UseApi";
import Layout from "./Layout";
import './App.css'


function App() {
  // đối tượng validate
  return ( 
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

  
  );
  

 
}

export default App;
