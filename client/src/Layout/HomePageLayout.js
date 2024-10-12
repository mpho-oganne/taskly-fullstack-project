// HomepageLayout.js
import React from 'react';
import Navbar from '../Pages/HomePage/NavBar';
import Footer from '../Pages/HomePage/Footer';

const HomepageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children} {/* Render the child component here */}
      </main>
      <Footer />
    </div>
  );
};

export default HomepageLayout;