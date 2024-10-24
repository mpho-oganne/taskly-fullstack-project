import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/profile";
import Layout from "./Layout/dashboardLayout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import UpdateTaskForm from "./Pages/Task/updateTask";
import Tasks from "./Pages/Task/taskList";
import CreateTaskForm from "./Pages/Task/createTask";
import Calendar from "./components/Calender/calender";
import Overview from "./components/Overview/overview";
import HomepageLayout from "./Layout/HomePageLayout";
import Leaderboard from "./components/Leaderboard/leaderboard";
import ReportComponent from "./components/WeeklyReport/report";
import VirtualRewards from "./components/TaskRewards/taskRewards";

// Context
import UserProvider from "./UserContext";
import RequireAuth from "./requireAuth";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={
              <HomepageLayout>
                <HomePage />
              </HomepageLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <HomepageLayout>
                <SignUp />
              </HomepageLayout>
            }
          />
          <Route
            path="/signin"
            element={
              <HomepageLayout>
                <SignIn />
              </HomepageLayout>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/dashboard/new-task" element={<CreateTaskForm />} />
            <Route path="/dashboard/tasks" element={<Tasks />}/>
            <Route path="/dashboard/update-task/:taskId" element={<UpdateTaskForm />}/>
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/calendar" element={<Calendar />}/>
            <Route path="/dashboard/overview" element={ <Overview /> } />
            <Route path="/dashboard/leaderboard" element={<Leaderboard />}/>
            <Route path="/dashboard/report" element={<ReportComponent />}/>
            <Route path="/dashboard/taskRewards" element={<VirtualRewards />}/>

            {/* Fallback for unmatched routes */}
          <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Route>
          

          
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
           
            
              
                
             
            
          
           
             
               
            
           
         
            
              
                
             
            
          
          
          
            
