import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Loader2,
  AlertCircle,
  User,
  BarChart2,
} from "lucide-react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/leaderboard", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data = await response.json();
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching leaderboard");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-7 h-7 text-amber-700" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-500" />;
      case 3:
        return <Award className="w-7 h-7 text-amber-900" />;
      default:
        return <User className="w-6 h-6 text-gray-600" />;
    }
  };

  const getBackgroundPattern = (index) => {
    const patterns = [
      "bg-gradient-to-r from-gray-50 to-beige-50",
      "bg-gradient-to-r from-beige-50 to-gray-100",
      "bg-gradient-to-r from-gray-100 to-beige-100",
      "bg-gradient-to-r from-beige-100 to-gray-200",
    ];
    return patterns[index % patterns.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-full shadow-xl">
          <Loader2 className="w-12 h-12 text-gray-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <span className="text-xl text-gray-800">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
          <BarChart2 className="w-10 h-10 text-gray-600 mr-3" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900">
            Leaderboard
          </span>
        </h1>
        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-600 text-lg bg-white p-6 rounded-lg shadow-lg">
            No users available in the leaderboard.
          </p>
        ) : (
          <div className="space-y-4">
            {leaderboard.slice(0, 10).map((user, index) => (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 ${getBackgroundPattern(
                  index
                )}`}
              >
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center space-x-5">
                    <div className="relative">
                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-beige-200 shadow-inner`}
                      >
                        {getRankIcon(index + 1)}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-gray-800">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">Rank #{index + 1}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-700">
                      {user.completedTasks}
                    </p>
                    <p className="text-sm text-gray-500">Tasks Completed</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
