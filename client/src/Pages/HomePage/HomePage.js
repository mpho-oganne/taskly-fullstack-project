import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Layout,
  Settings,
  CheckCircle,
  Users,
  BarChart2,
  Quote,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Taskly
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl animate-fade-in-up">
          Your all-in-one tool to stay organized, achieve more, and unlock your
          full potential.
          <br />
          Ready to take control of your tasks? Start now!
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="relative text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-110"
        >
          Get Started Now
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-purple-500 underline cursor-pointer"
          >
            Sign in
          </span>
        </p>

        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            About <span className="text-purple-600">Taskly</span>
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Taskly is your intelligent companion in the world of personal task
              management. We've combined cutting-edge AI technology with
              intuitive design to create a platform that not only organizes your
              tasks but actively helps you accomplish them.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're a busy professional juggling multiple projects, a
              student balancing coursework and extracurriculars, or anyone
              looking to bring order to their daily life, Taskly adapts to your
              unique needs and work style. Our AI-powered features, including
              task suggestions and upcoming chatbot support, are designed to
              make your task management experience smoother and more efficient
              than ever before.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-purple-600">Taskly</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Clock className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Manage Time Efficiently
              </h3>
              <p className="text-gray-600">
                Keep track of all your tasks and manage your time effectively
                with Taskly's productivity tools.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Layout className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Multiple Views
              </h3>
              <p className="text-gray-600">
                Switch between list, board, and calendar views to organize your
                tasks in a way that fits your style.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Settings className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Customizable Workflow
              </h3>
              <p className="text-gray-600">
                Customize fields and layouts to personalize your task management
                and boost productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful <span className="text-purple-600">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* AI-powered productivity */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  AI-Powered Assistance
                </h3>
                <p className="mb-6">
                  Taskly's AI integration helps you stay on top of your tasks by
                  suggesting tasks and reading them out loud, keeping you
                  organized and efficient.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    AI-powered task suggestions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Text-to-Speech for reading tasks out loud
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Upcoming AI chatbot
                  </li>
                </ul>
                <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Track Progress & Compete
                </h3>
                <p className="mb-6">
                  Monitor your tasks, track your working hours, and compete with
                  others on the leaderboard as you complete tasks and achieve
                  more.
                </p>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Task Progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2.5">
                    <div
                      className="bg-white h-2.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <button className="mt-6 bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                  View Leaderboard
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
                  <BarChart2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Earn Rewards & Get Reports
                </h3>
                <p className="mb-6">
                  Earn rewards for task completion, and receive full reports
                  with insightful graphics on your productivity and performance.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Clock className="mr-2" /> Time Tracking
                    </span>
                    <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Layout className="mr-2" /> Sprints
                    </span>
                    <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Settings className="mr-2" /> Custom Fields
                    </span>
                    <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
                <button className="mt-6 bg-white text-green-600 font-bold py-2 px-6 rounded-full hover:bg-green-100 transition duration-300">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-center mb-16">
              What Our Users <span className="text-purple-600">Say</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  content:
                    "Taskly has revolutionized the way I manage my team's projects!",
                  name: "Sarah J.",
                  role: "Marketing Manager",
                },
                {
                  content:
                    "As a freelancer, keeping track of multiple clients is now a breeze.",
                  name: "Michael C.",
                  role: "Freelance Designer",
                },
                {
                  content:
                    "Taskly's intuitive interface helps me stay on top of my research.",
                  name: "Emily R.",
                  role: "Graduate Student",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start space-y-4"
                >
                  <Quote className="w-8 h-8 text-purple-500" />
                  <p className="text-gray-600 italic flex-grow">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
