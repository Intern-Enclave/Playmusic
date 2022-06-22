import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { publicRoute } from "./routes";

import Layout from "./Layout";

import './App.css'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
