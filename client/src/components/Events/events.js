import React from "react";

export default function EventsAndDeadlines({
  todaysEvents = [],
  upcomingEvents = [],
  missedDeadlines = [],
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Events & Reminders
      </h2>

      {/* Today's Events Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Today's Events
        </h3>
        {todaysEvents.length > 0 ? (
          <ul className="space-y-2">
            {todaysEvents.map((event, idx) => (
              <li
                key={idx}
                className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded"
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    event.type === "Task" ? "bg-blue-500" : "bg-green-500"
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
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Upcoming Events
        </h3>
        {upcomingEvents.length > 0 ? (
          <ul className="space-y-2">
            {upcomingEvents.slice(0, 3).map((event, idx) => (
              <li
                key={idx}
                className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded"
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
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Missed Deadlines
        </h3>
        {missedDeadlines.length > 0 ? (
          <ul className="space-y-2">
            {missedDeadlines.slice(0, 3).map((task, idx) => (
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
  );
}
