import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarComponent({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to calculate the number of days in the current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Function to get the first day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Function to render the calendar
  const renderCalendar = () => {
    const days = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendarDays = [];

    // Empty days for the start of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Loop through the days of the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isToday = date.toDateString() === new Date().toDateString();
      const eventsForDay = tasks.filter(
        (task) => new Date(task.dueDate).toDateString() === date.toDateString()
      );

      calendarDays.push(
        <div
          key={day}
          className={`h-8 flex flex-col items-center justify-center relative ${
            isToday ? "bg-blue-500 rounded-full text-white" : ""
          }`}
        >
          <span className={`text-xs ${isToday ? "font-bold" : ""}`}>{day}</span>
          {eventsForDay.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex">
              {eventsForDay.map((event, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full mx-0.5 ${
                    event.status === "completed"
                      ? "bg-green-500"
                      : "bg-pink-500"
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

  // Function to go to the next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Function to go to the previous month
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-blue-600">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  );
}
