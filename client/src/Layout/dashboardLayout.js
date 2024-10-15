import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/sidebar";
import Overview from "../components/Overview/overview";
import TaskList from "../Pages/Task/taskList";
import Calendar from "../components/Calender/calender";
import EventsAndDeadlines from "../components/Events/events";
import Graphs from "../components/Graphs/graphs";
import DashboardHeader from "../components/DashboardHeader/dashboardheader";
import VirtualAssistant from "../components/VirtualAssistant/virtual-assistant"

const Sheet = ({ isOpen, onClose, children }) =>
  isOpen && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );

export default function DashboardLayout() {
  const { user, signout } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [workingHours, setWorkingHours] = useState({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });

  const [todaysEvents, setTodaysEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [missedDeadlines, setMissedDeadlines] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const isRootPath = location.pathname === "/dashboard";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/tasks", {
          withCredentials: true,
        });
        setTasks(response.data);
        setFilteredTasks(response.data);
        processTaskData(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (query) => {
    if (query === "") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((task) =>
          task.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const processTaskData = (tasks) => {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasksWithReminders = tasks.map((task) => {
      const taskDueDate = new Date(task.dueDate);
      const taskEvent = {
        title: task.title,
        date: taskDueDate,
        type: "Task",
        isMissed:
          taskDueDate < now && taskDueDate.getDate() !== today.getDate(),
      };

      const reminderEvents =
        task.reminders?.map((reminder) => ({
          title: `Reminder for ${task.title}`,
          date: new Date(reminder.reminderTime),
          type: "Reminder",
        })) || [];

      return [taskEvent, ...reminderEvents];
    });

    const allEvents = tasksWithReminders.flat();

    setUpcomingEvents(allEvents.filter((event) => event.date > today));
    setMissedDeadlines(
      allEvents.filter((event) => event.type === "Task" && event.isMissed)
    );
    setTodaysEvents(
      allEvents.filter(
        (event) => event.date.toDateString() === today.toDateString()
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle button */}
      <Sheet isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <Sidebar user={user} signout={signout} />
      </Sheet>

      <div className="hidden lg:block w-64">
        <Sidebar user={user} signout={signout} />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex-grow p-6 lg:ml-2"> 
          <Outlet />
          {isRootPath && (
            <div className="lg:flex lg:space-x-6">
              {/* Main dashboard content */}
              <main className="flex-grow p-4 lg:p-6 overflow-auto bg-white rounded shadow">
                <DashboardHeader onSearch={handleSearch} />
                <Overview tasks={filteredTasks} />
                <Graphs tasks={filteredTasks} workingHours={workingHours} />
                {/* <TaskList tasks={filteredTasks} limit={5} /> */}
              </main>

              {/* Sidebar content */}
              <aside className="w-full lg:w-80 bg-white rounded shadow-lg mt-6 lg:mt-0">
                <div className="border-b p-4">
                  <Calendar tasks={filteredTasks} />
                </div>
                <div className="p-4">
                  <EventsAndDeadlines
                    todaysEvents={todaysEvents}
                    upcomingEvents={upcomingEvents}
                    missedDeadlines={missedDeadlines}
                  />
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
      <VirtualAssistant/>
    </div>
  );
}
