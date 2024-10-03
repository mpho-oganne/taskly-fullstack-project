import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import NavBar from './Pages/HomePage/NavBar'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Footer from './Pages/HomePage/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;