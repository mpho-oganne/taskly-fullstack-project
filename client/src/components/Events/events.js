import React from "react";
import { Clock, Calendar, AlertCircle } from "lucide-react";

export default function EventsAndDeadlines({
  todaysEvents = [],
  upcomingEvents = [],
  missedDeadlines = [],
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Events & Reminders</h2>

      {/* Today's Events Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Clock className="mr-2 text-blue-500" />
          Today's Events
        </h3>
        {todaysEvents.length > 0 ? (
          <ul className="space-y-2">
            {todaysEvents.map((event, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      event.type === "Task" ? "bg-blue-500" : "bg-green-500"
                    }`}
                  ></div>
                  <span className="font-medium">{event.title}</span>
                </div>
                <span className="text-blue-600">
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No events for today.</p>
        )}
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <Calendar className="mr-2 text-green-500" />
          Upcoming Events
        </h3>
        {upcomingEvents.length > 0 ? (
          <ul className="space-y-2">
            {upcomingEvents.slice(0, 3).map((event, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-100"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <span className="font-medium">{event.title}</span>
                </div>
                <span className="text-green-600">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No upcoming events.</p>
        )}
      </div>

      {/* Missed Deadlines Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <AlertCircle className="mr-2 text-red-500" />
          Missed Deadlines
        </h3>
        {missedDeadlines.length > 0 ? (
          <ul className="space-y-2">
            {missedDeadlines.slice(0, 3).map((task, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <span className="font-medium">{task.title}</span>
                </div>
                <span>{new Date(task.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No missed deadlines.</p>
        )}
      </div>
    </div>
  );
}
