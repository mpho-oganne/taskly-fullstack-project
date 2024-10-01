import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage/HomePage';
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'

const App = () => {
  return (

    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>   
  </Router>
    
  );
};

export default App;
