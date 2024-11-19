/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route exact path={`/`} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
