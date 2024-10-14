import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

import Sidebar from "../components/Sidebar/sidebar";
import Overview from "../components/Overview/overview";
import TaskList from "../Pages/Task/taskList";
import Calendar from "../components/Calender/calender";
import EventsAndDeadlines from "../components/Events/events";
import Graphs from "../components/Graphs/graphs";
import DashboardHeader from "../components/DashboardHeader/dashboardheader";

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
  >
    {children}
  </button>
);

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40"
        aria-label="Open sidebar"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Button>

      <Sheet isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <Sidebar user={user} signout={signout} />
      </Sheet>

      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar user={user} signout={signout} />
        </div>

        <main className="flex-grow p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <DashboardHeader onSearch={handleSearch} />
            <Overview tasks={filteredTasks} />
            <Graphs tasks={filteredTasks} workingHours={workingHours} />
            <TaskList tasks={filteredTasks} limit={5} />
          </div>
        </main>

        <div className="w-full lg:w-80 bg-white border-t lg:border-l border-gray-200 flex flex-col items-center lg:items-stretch">
          <div className="w-full max-w-sm lg:max-w-full flex-shrink-0 py-4 px-4 border-b border-gray-200">
            <Calendar tasks={filteredTasks} />
          </div>
          <div className="w-full max-w-sm lg:max-w-full flex-grow overflow-y-auto p-4">
            <EventsAndDeadlines
              todaysEvents={todaysEvents}
              upcomingEvents={upcomingEvents}
              missedDeadlines={missedDeadlines}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
