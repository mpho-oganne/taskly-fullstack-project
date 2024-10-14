import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar, Pie } from 'react-chartjs-2'
import { CheckCircle, Clock, List, AlertTriangle, Zap, Calendar, Award, Activity } from 'lucide-react'

const ReportComponent = () => {
  const [reportData, setReportData] = useState(null)

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/reports', { withCredentials: true })
      setReportData(response.data)
    } catch (error) {
      console.error("Error fetching report data:", error)
    }
  }

  if (!reportData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const { 
    totalTasks, 
    completedTasks, 
    pendingTasks, 
    unfinishedTasks, 
    overdueTasks, 
    avgCompletionTime, 
    priorityBreakdown, 
    highPriorityTasks, 
    completionRate, 
    recentTasks, 
    dueToday, 
    dueTomorrow, 
    dueNextWeek, 
    longestUnfinishedTaskDuration 
  } = reportData

  const taskStatusData = {
    labels: ['Completed', 'Pending', 'Unfinished', 'Overdue'],
    datasets: [
      {
        label: 'Tasks',
        data: [completedTasks, pendingTasks, unfinishedTasks, overdueTasks],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#F44336'],
      },
    ],
  }

  const priorityData = {
    labels: ['High Priority', 'Low Priority'],
    datasets: [
      {
        data: [priorityBreakdown.high, priorityBreakdown.low],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  }

  const dueDateData = {
    labels: ['Due Today', 'Due Tomorrow', 'Due Next Week'],
    datasets: [
      {
        label: 'Tasks',
        data: [dueToday, dueTomorrow, dueNextWeek],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }

  const completionRateData = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [completionRate, 100 - completionRate],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Report</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-md text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Total Tasks</h3>
            <List className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{totalTasks}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-md text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Completed</h3>
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{completedTasks}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-lg shadow-md text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Pending</h3>
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{pendingTasks}</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-lg shadow-md text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Overdue</h3>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="text-2xl font-bold">{overdueTasks}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Task Status</h3>
          <div className="h-48">
            <Bar data={taskStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Priority Breakdown</h3>
          <div className="h-48">
            <Pie data={priorityData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Due Date Overview</h3>
          <div className="h-48">
            <Bar data={dueDateData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
          <div className="h-48">
            <Pie data={completionRateData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            Task Efficiency
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                <span>Avg Completion Time</span>
              </div>
              <span className="font-semibold">{avgCompletionTime.toFixed(2)} hrs</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4 text-green-500" />
                <span>Completion Rate</span>
              </div>
              <span className="font-semibold">{completionRate}%</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                <span>High Priority Tasks</span>
              </div>
              <span className="font-semibold">{highPriorityTasks}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-purple-500" />
                <span>Recent Tasks</span>
              </div>
              <span className="font-semibold">{recentTasks}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
            Task Timeline
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-red-500" />
                <span>Due Today</span>
              </div>
              <span className="font-semibold">{dueToday}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-orange-500" />
                <span>Due Tomorrow</span>
              </div>
              <span className="font-semibold">{dueTomorrow}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Due Next Week</span>
              </div>
              <span className="font-semibold">{dueNextWeek}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-blue-500" />
                <span>Longest Unfinished</span>
              </div>
              <span className="font-semibold">{longestUnfinishedTaskDuration.toFixed(2)} hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportComponent
