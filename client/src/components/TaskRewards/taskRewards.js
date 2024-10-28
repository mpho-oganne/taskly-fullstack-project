"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Star, Trophy, CheckCircle, Clock, List } from 'lucide-react'

const IconWrapper = ({ children, color }) => (
  <div className={`p-3 rounded-full ${color} text-white`}>
    {children}
  </div>
)

const BadgeCard = ({ icon, title, description, locked = false }) => (
  <motion.div 
    className={`p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${locked ? 'opacity-50' : ''}`}
    whileHover={{ scale: locked ? 1 : 1.05 }}
    whileTap={{ scale: locked ? 1 : 0.95 }}
  >
    <div className="flex flex-col items-center text-center space-y-4">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {locked && <p className="text-sm text-red-500">Locked</p>}
    </div>
  </motion.div>
)

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    <motion.div 
      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
)

export default function VirtualRewards() {
  const [activeTab, setActiveTab] = useState('Badges')
  
  const badges = [
    {
      icon: <IconWrapper color="bg-yellow-400"><Zap size={24} /></IconWrapper>,
      title: "Quick Starter",
      description: "Complete your first task",
      locked: false
    },
    {
      icon: <IconWrapper color="bg-purple-500"><Star size={24} /></IconWrapper>,
      title: "On a Roll",
      description: "Complete 3 tasks in a day",
      locked: true
    },
    {
      icon: <IconWrapper color="bg-blue-500"><Trophy size={24} /></IconWrapper>,
      title: "Task Champion",
      description: "Complete 10 tasks total",
      locked: true
    }
  ]

  const pointsData = {
    totalPoints: 10,
    thisWeek: 10,
    pointsToNext: 90,
    nextLevel: "Bronze",
    recentActivity: [
      { action: "Signed up", points: 10, date: "2024-03-20" }
    ]
  }

  const achievements = [
    {
      title: "Task Beginner",
      progress: 0,
      current: 0,
      target: 5,
      description: "Complete 5 tasks"
    },
    {
      title: "Early Bird",
      progress: 0,
      current: 0,
      target: 3,
      description: "Complete 3 tasks before 9 AM"
    },
    {
      title: "Consistency Starter",
      progress: 20,
      current: 1,
      target: 5,
      description: "Log in for 5 consecutive days"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Virtual Rewards</h2>
          <p className="text-xl text-gray-600">Start your journey and track your progress!</p>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          {['Badges', 'Points', 'Achievements'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-6 rounded-full text-lg font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-inner"
        >
          {activeTab === 'Badges' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <BadgeCard key={index} {...badge} />
              ))}
            </div>
          )}
          
          {activeTab === 'Points' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-blue-600 mb-2">
                  {pointsData.totalPoints}
                </h3>
                <p className="text-xl text-gray-600">Total Points</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Progress to {pointsData.nextLevel}</span>
                  <span className="text-blue-600 font-semibold">{pointsData.pointsToNext} points needed</span>
                </div>
                <ProgressBar progress={10} />
              </div>

              <div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  {pointsData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-lg text-gray-800 font-medium">{activity.action}</p>
                        <p className="text-gray-500">{activity.date}</p>
                      </div>
                      <span className="text-2xl font-bold text-green-500">+{activity.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'Achievements' && (
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xl font-semibold text-gray-800">{achievement.title}</h4>
                    <span className="text-lg text-blue-600 font-medium">
                      {achievement.current}/{achievement.target}
                    </span>
                  </div>
                  <ProgressBar progress={achievement.progress} />
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
