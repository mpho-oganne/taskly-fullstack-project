import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './Pages/HomePage/NavBar';
import Profile from './Pages/Profile/profile';
import Layout from './pagesLayout';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Footer from './Pages/HomePage/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Layout />} /> {/*The other sections need to be added here */}
            <Route path="/profile" element={<Profile />} /> {/* This needs to be wrapped with the navbar so that it doesn't show on its own*/}
          
          </Routes>
        </main>
        <Footer /> {/*The footer, navbar and homepage need to be wrapped together */}
      </div>
    </Router>
  );
};

export default App;