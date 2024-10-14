import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar({ tasks = [] }) {
  // Default to an empty array if tasks is undefined
  const [currentDate, setCurrentDate] = useState(new Date());

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
      calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

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
            isToday ? "bg-blue-100 rounded-full" : ""
          }`}
        >
          <span
            className={`text-xs ${isToday ? "font-bold text-blue-600" : ""}`}
          >
            {day}
          </span>
          {eventsForDay.length > 0 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex">
              {eventsForDay.map((event, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full mx-0.5 ${
                    event.status === "completed" ? "bg-green-500" : "bg-red-500"
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
    <aside className="w-80 bg-white p-6 overflow-y-auto border-l border-gray-200">
      {/* Calendar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">
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
              className="text-center text-xs font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
      </div>
    </aside>
  );
}
