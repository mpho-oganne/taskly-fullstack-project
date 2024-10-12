import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/profile";
import Layout from "./Layout/dashboardLayout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import UpdateTaskForm from "./Pages/Task/updateTask";
import ManageTasks from "./Pages/Task/manageTasks";
import CreateTaskForm from "./Pages/Task/createTask";
import Calendar from "./components/Calender/calender";
import Leaderboard from "./components/Leaderboard/leaderboard";

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
              <Route path="/update-task/:taskId" element={<UpdateTaskForm />} />
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
              <Route
                path="/calendar"
                element={
                  <RequireAuth>
                    <Calendar />
                  </RequireAuth>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <RequireAuth>
                    <Leaderboard />
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
