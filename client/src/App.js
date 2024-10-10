import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Pages/HomePage/NavBar";
import Profile from "./Pages/Profile/profile";
import Layout from "./pagesLayout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Footer from "./Pages/HomePage/Footer";
import ManageTasks from './Pages/Task/manageTasks';
import CreateTaskForm from './Pages/Task/createTask';

import UserProvider, { UserContext } from "./UserContext"; // Import UserProvider as default and UserContext as named

// RequireAuth component
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/new-task" element={<CreateTaskForm />} />
              <Route path="/dashboard" element={<Layout />} />
              <Route path="/tasks" element={<ManageTasks />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Layout />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
