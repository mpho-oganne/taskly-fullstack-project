import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/profile";
import Layout from "./Layout/dashboardLayout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import UpdateTaskForm from "./Pages/Task/updateTask";
import ManageTasks from './Pages/Task/manageTasks';
import CreateTaskForm from './Pages/Task/createTask';
import UserProvider from "./UserContext"; 
import HomepageLayout from './Layout/HomePageLayout';
import RequireAuth from "./requireAuth";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<HomepageLayout><HomePage /></HomepageLayout>} />
          <Route path="/signup" element={<HomepageLayout><SignUp /></HomepageLayout>} />
          <Route path="/signin" element={<HomepageLayout><SignIn /></HomepageLayout>} />

          {/* Protected routes */}
          <Route
            path="/new-task"
            element={
              <RequireAuth>
                <CreateTaskForm />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          />
          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <ManageTasks />
              </RequireAuth>
            }
          />
          <Route
            path="/update-task/:taskId"
            element={
              <RequireAuth>
                <UpdateTaskForm />
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
      </Router>
    </UserProvider>
  );
};

export default App;