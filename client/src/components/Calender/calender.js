import React, { useState, useEffect } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import axios from "axios"; // Import axios
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons from lucide-react
import "react-calendar/dist/Calendar.css"; // Import calendar CSS

const Calendar = () => {
  const [value, onChange] = useState(new Date());
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

          const reminderEvents = task.reminders.map((reminder) => {
            const reminderDate = new Date(reminder.reminderTime);

            return {
              title: `Reminder for ${task.title}`,
              date: reminderDate,
              type: "Reminder",
            };
          });

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

  return (
    <div className="flex justify-center items-start space-x-4 min-h-screen bg-gray-100 p-2">
      {/* Calendar Section */}
      <div className="bg-white shadow-md rounded-lg p-4 w-[400px]">
        <div className="flex justify-between items-center mb-2">
          <ChevronLeft className="text-gray-500 hover:text-blue-500 cursor-pointer" />
          <h2 className="text-lg font-bold text-gray-800">
            {value.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <ChevronRight className="text-gray-500 hover:text-blue-500 cursor-pointer" />
        </div>
        <ReactCalendar
          onChange={onChange}
          value={value}
          tileContent={({ date }) => {
            const eventsForDate = events.filter((event) => {
              const eventDate = event.date.toISOString().split("T")[0];
              const calendarDate = date.toISOString().split("T")[0];
              return eventDate === calendarDate;
            });

            return eventsForDate.length > 0 ? (
              <ul>
                {eventsForDate.map((event, idx) => (
                  <li
                    key={idx}
                    className={`text-xs ${
                      event.type === "Task"
                        ? event.isMissed
                          ? "text-red-500"
                          : "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {event.title}
                  </li>
                ))}
              </ul>
            ) : null;
          }}
          className="border-none w-full"
        />
      </div>

      {/* Events and Deadlines Section */}
      <div className="flex flex-col space-y-4">
        {/* Today's Events Section */}
        <div className="bg-white shadow-md rounded-lg p-4 w-[280px]">
          <h2 className="text-md font-semibold text-gray-800 mb-2">
            Today's Events
          </h2>
          {todaysEvents.length > 0 ? (
            <ul className="list-disc pl-4 space-y-1">
              {todaysEvents.map((event, idx) => (
                <li key={idx} className="text-xs text-blue-500">
                  {event.title} - {new Date(event.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500">No events for today.</p>
          )}
        </div>

        {/* Reminders & Deadlines Section */}
        <div className="bg-white shadow-md rounded-lg p-4 w-[280px]">
          <h2 className="text-md font-semibold text-gray-800 mb-2">
            Reminders & Deadlines
          </h2>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Upcoming Events
            </h3>
            {upcomingEvents.length > 0 ? (
              <ul className="list-disc pl-4 space-y-1">
                {upcomingEvents.map((event, idx) => (
                  <li key={idx} className="text-xs text-green-500">
                    {event.title} - {new Date(event.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">No upcoming events.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Missed Deadlines
            </h3>
            {missedDeadlines.length > 0 ? (
              <ul className="list-disc pl-4 space-y-1">
                {missedDeadlines.map((task, idx) => (
                  <li key={idx} className="text-xs text-red-500">
                    {task.title} - {new Date(task.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">No missed deadlines.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
