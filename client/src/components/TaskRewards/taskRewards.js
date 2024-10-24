import React, { useState } from 'react';

const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-yellow-400">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-purple-400">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-blue-400">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const VirtualRewards = () => {
  const [activeTab, setActiveTab] = useState('Badges');
  
  const badges = [
    {
      icon: <LightningIcon />,
      title: "Early Bird",
      description: "Completed 5 tasks before 12 PM"
    },
    {
      icon: <StarIcon />,
      title: "Overachiever",
      description: "Completed 20 tasks in a week"
    },
    {
      icon: <TrophyIcon />,
      title: "Consistency King",
      description: "Logged in for 30 consecutive days"
    }
  ];

  const pointsData = {
    totalPoints: 1250,
    thisWeek: 320,
    pointsToNext: 250,
    nextLevel: "Gold",
    recentActivity: [
      { action: "Completed task", points: 50, date: "2024-03-20" },
      { action: "Daily login", points: 10, date: "2024-03-20" },
      { action: "Streak bonus", points: 100, date: "2024-03-19" },
      { action: "Task completion streak", points: 75, date: "2024-03-19" }
    ]
  };

  const achievements = [
    {
      title: "Task Master",
      progress: 75,
      current: 75,
      target: 100,
      description: "Complete 100 tasks"
    },
    {
      title: "Perfect Week",
      progress: 40,
      current: 2,
      target: 5,
      description: "Complete all daily tasks for 5 consecutive days"
    },
    {
      title: "Productivity Pro",
      progress: 90,
      current: 45,
      target: 50,
      description: "Complete 50 tasks before their deadline"
    }
  ];

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 space-y-1.5">
        <h2 className="text-2xl font-bold text-gray-900">Your Virtual Rewards</h2>
        <p className="text-gray-500">Track your progress and achievements</p>
      </div>
      
      <div className="flex border-b">
        {['Badges', 'Points', 'Achievements'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium transition-colors
              ${activeTab === tab 
                ? 'border-b-2 border-gray-900 text-gray-900' 
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'Badges' && (
          <div className="space-y-4">
            {badges.map((badge, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-2">
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'Points' && (
          <div className="space-y-6">
            {/* Points Overview */}
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-1">
                {pointsData.totalPoints}
              </h3>
              <p className="text-sm text-blue-600">Total Points</p>
            </div>

            {/* Progress to Next Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress to {pointsData.nextLevel}</span>
                <span className="text-gray-600">{pointsData.pointsToNext} points needed</span>
              </div>
              <ProgressBar progress={70} />
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {pointsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-gray-500 text-xs">{activity.date}</p>
                    </div>
                    <span className="text-green-600">+{activity.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Achievements' && (
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  <span className="text-sm text-gray-600">
                    {achievement.current}/{achievement.target}
                  </span>
                </div>
                <ProgressBar progress={achievement.progress} />
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualRewards;