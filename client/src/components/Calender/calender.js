import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [missedDeadlines, setMissedDeadlines] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/tasks", { withCredentials: true })
      .then((response) => {
        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tasksWithReminders = response.data.map((task) => {
          const taskDueDate = new Date(task.dueDate);

          const taskEvent = {
            title: task.title,
            date: taskDueDate,
            type: "Task",
            isMissed:
              taskDueDate < now && taskDueDate.getDate() !== today.getDate(),
          };

          const reminderEvents = task.reminders.map((reminder) => ({
            title: `Reminder for ${task.title}`,
            date: new Date(reminder.reminderTime),
            type: "Reminder",
          }));

          return [taskEvent, ...reminderEvents];
        });

        const allEvents = tasksWithReminders.flat();

        setEvents(allEvents);
        const upcomingEventsList = allEvents.filter((event) => {
          const todayStart = new Date(today);
          todayStart.setHours(23, 59, 59, 999);
          return event.date > todayStart;
        });
        const missedDeadlinesList = allEvents.filter(
          (event) => event.type === "Task" && event.isMissed
        );
        const todaysEventsList = allEvents.filter(
          (event) => event.date.toDateString() === today.toDateString()
        );

        setUpcomingEvents(upcomingEventsList);
        setMissedDeadlines(missedDeadlinesList);
        setTodaysEvents(todaysEventsList);
      })
      .catch((error) => {
        console.error("Error fetching tasks and reminders:", error);
      });
  }, []);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const days = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= days; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isToday = date.toDateString() === new Date().toDateString();
      const eventsForDay = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      );

      calendarDays.push(
        <div
          key={day}
          className={`h-10 flex flex-col items-center justify-center relative ${
            isToday ? "bg-purple-100 rounded-full" : ""
          }`}
        >
          <span
            className={`text-sm ${isToday ? "font-bold text-purple-600" : ""}`}
          >
            {day}
          </span>
          {eventsForDay.length > 0 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex">
              {eventsForDay.map((event, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full mx-0.5 ${
                    event.type === "Task"
                      ? event.isMissed
                        ? "bg-red-500"
                        : "bg-purple-500"
                      : "bg-green-500"
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 min-h-screen bg-gray-100 p-4">
      {/* Calendar Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-purple-500 hover:text-purple-700 focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-purple-800">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={nextMonth}
            className="text-purple-500 hover:text-purple-700 focus:outline-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-purple-600"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
      </div>

      {/* Events and Deadlines Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-[400px] flex flex-col h-full md:h-[380px] overflow-hidden">
        <h2 className="text-xl font-bold text-purple-800 mb-2">
          Events & Reminders
        </h2>

        <div className="overflow-y-auto flex-grow">
          {/* Today's Events Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              Today's Events
            </h3>
            {todaysEvents.length > 0 ? (
              <ul className="space-y-2">
                {todaysEvents.map((event, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-purple-600 bg-purple-50 p-2 rounded"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        event.type === "Task" ? "bg-purple-500" : "bg-green-500"
                      }`}
                    ></div>
                    {event.title} -{" "}
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No events for today.</p>
            )}
          </div>

          {/* Upcoming Events Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              Upcoming Events
            </h3>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-2">
                {upcomingEvents.map((event, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    {event.title} - {new Date(event.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No upcoming events.</p>
            )}
          </div>

          {/* Missed Deadlines Section */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              Missed Deadlines
            </h3>
            {missedDeadlines.length > 0 ? (
              <ul className="space-y-2">
                {missedDeadlines.map((task, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-red-500 bg-red-50 p-2 rounded"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    {task.title} - {new Date(task.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No missed deadlines.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
