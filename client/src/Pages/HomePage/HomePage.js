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

import { FiClock, FiLayout, FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
          {t("home.welcome")}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Taskly
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl animate-fade-in-up">
        {t("home.description")}
          <br />
          {t("home.takeControl")}
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="relative text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-110"
        >
          {t("home.getStarted")}
        </button>

        <p className="mt-4 text-sm text-gray-500">
        {t("home.alreadyHaveAccount")}
          <span
            onClick={() => navigate("/signin")}
            className="text-purple-500 underline cursor-pointer"
          >
            {t("home.signIn")}
            
          </span>
        </p>

        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t("home.about.title")} <span className="text-purple-600">{t("home.about.taskly")}</span>
        </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              {t("home.about.text1")}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
            {t("home.about.text2")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t("home.whyChoose.title")} <span className="text-purple-600">{t("home.whyChoose.taskly")}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Clock className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("home.whyChoose.features.0.title")}
              </h3>
              <p className="text-gray-600">
              {t("home.whyChoose.features.0.text")}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Layout className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("home.whyChoose.features.1.title")}
              </h3>
              <p className="text-gray-600">
              {t("home.whyChoose.features.1.text")}              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <Settings className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("home.whyChoose.features.2.title")}
              </h3>
              <p className="text-gray-600">
              {t("home.whyChoose.features.2.text")}              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
          {t("home.powerfulFeatures.title")} <span className="text-purple-600">{t("home.powerfulFeatures.title2")}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* AI-powered productivity */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {t("home.powerfulFeatures.feature1.title")}
                </h3>
                <p className="mb-6">
                {t("home.powerfulFeatures.feature1.text")}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t("home.powerfulFeatures.feature1.points.0")}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t("home.powerfulFeatures.feature1.points.1")}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t("home.powerfulFeatures.feature1.points.2")}
                  </li>
                </ul>
                <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition duration-300">
                {t("home.powerfulFeatures.feature1.button")}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {t("home.powerfulFeatures.feature2.title")}
                </h3>
                <p className="mb-6">
                  {t("home.powerfulFeatures.feature2.text")}
                </p>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">{t("home.powerfulFeatures.feature2.headers.0")}</span>
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
                  {t("home.powerfulFeatures.feature2.button")}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
                  <BarChart2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {t("home.powerfulFeatures.feature3.title")}
                </h3>
                <p className="mb-6">
                  {t("home.powerfulFeatures.feature3.text")}
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Clock className="mr-2" /> {t("home.powerfulFeatures.feature3.points.0")}
                    </span>
                    <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Layout className="mr-2" /> {t("home.powerfulFeatures.feature3.points.1")}
                    </span>
                    <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Settings className="mr-2" /> {t("home.powerfulFeatures.feature3.points.2")}
                    </span>
                    <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
                <button className="mt-6 bg-white text-green-600 font-bold py-2 px-6 rounded-full hover:bg-green-100 transition duration-300">
                  {t("home.powerfulFeatures.feature3.button")}
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
              {t("home.sectionTitle")} <span className="text-purple-600">{t("home.sectionTitle2")}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  content:
                    t("home.testimonials.0.quote"),
                  name: "Sarah J.",
                  role: t("home.testimonials.0.role"),
                },
                {
                  content:
                    t("home.testimonials.1.quote"),
                  name: "Michael C.",
                  role: t("home.testimonials.1.role"),
                },
                {
                  content:
                  t("home.testimonials.2.quote"),
                  name: "Emily R.",
                  role: t("home.testimonials.2.role"),
                },
               ,
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
