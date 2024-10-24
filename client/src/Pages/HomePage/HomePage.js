import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Layout,
  Settings,
  CheckCircle,
  Users,
  BarChart2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection navigate={navigate} t={t} />
      <AboutSection t={t} />
      <FeaturesSection t={t} />
      <PowerfulFeaturesSection t={t} />
      <TestimonialsSection t={t} />
    </div>
  );
}

function HeroSection({ navigate, t }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
        {t("home.welcome")}{" "}
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
        {t("home.alreadyHaveAccount")}{" "}
        <span
          onClick={() => navigate("/signin")}
          className="text-purple-500 underline cursor-pointer"
        >
          {t("home.signIn")}
        </span>
      </p>

      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
    </section>
  );
}

function AboutSection({ t }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t("home.about.title")}{" "}
          <span className="text-purple-600">{t("home.about.taskly")}</span>
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 mb-6">{t("home.about.text1")}</p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t("home.about.text2")}
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ t }) {
  const features = [
    {
      icon: Clock,
      title: t("home.whyChoose.features.0.title"),
      text: t("home.whyChoose.features.0.text"),
    },
    {
      icon: Layout,
      title: t("home.whyChoose.features.1.title"),
      text: t("home.whyChoose.features.1.text"),
    },
    {
      icon: Settings,
      title: t("home.whyChoose.features.2.title"),
      text: t("home.whyChoose.features.2.text"),
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          {t("home.whyChoose.title")}{" "}
          <span className="text-purple-600">{t("home.whyChoose.taskly")}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:scale-105"
            >
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <feature.icon className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PowerfulFeaturesSection({ t }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          {t("home.powerfulFeatures.title")}{" "}
          <span className="text-purple-600">
            {t("home.powerfulFeatures.title2")}
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <PowerfulFeatureCard
            gradient="from-purple-600 to-indigo-600"
            icon={CheckCircle}
            title={t("home.powerfulFeatures.feature1.title")}
            text={t("home.powerfulFeatures.feature1.text")}
            points={[
              t("home.powerfulFeatures.feature1.points.0"),
              t("home.powerfulFeatures.feature1.points.1"),
              t("home.powerfulFeatures.feature1.points.2"),
            ]}
            buttonText={t("home.powerfulFeatures.feature1.button")}
            buttonColor="text-purple-600"
          />
          <PowerfulFeatureCard
            gradient="from-blue-500 to-cyan-500"
            icon={Users}
            title={t("home.powerfulFeatures.feature2.title")}
            text={t("home.powerfulFeatures.feature2.text")}
            progressBar={{
              label: t("home.powerfulFeatures.feature2.headers.0"),
              value: 75,
            }}
            buttonText={t("home.powerfulFeatures.feature2.button")}
            buttonColor="text-blue-600"
          />
          <PowerfulFeatureCard
            gradient="from-green-500 to-emerald-600"
            icon={BarChart2}
            title={t("home.powerfulFeatures.feature3.title")}
            text={t("home.powerfulFeatures.feature3.text")}
            toggles={[
              t("home.powerfulFeatures.feature3.points.0"),
              t("home.powerfulFeatures.feature3.points.1"),
              t("home.powerfulFeatures.feature3.points.2"),
            ]}
            buttonText={t("home.powerfulFeatures.feature3.button")}
            buttonColor="text-green-600"
          />
        </div>
      </div>
    </section>
  );
}

function PowerfulFeatureCard({
  gradient,
  icon: Icon,
  title,
  text,
  points,
  progressBar,
  toggles,
  buttonText,
  buttonColor,
}) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl shadow-xl overflow-hidden`}
    >
      <div className="p-8 text-white">
        <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mb-6">
          <Icon className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="mb-6">{text}</p>
        {points && (
          <ul className="space-y-2 mb-6">
            {points.map((point, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {point}
              </li>
            ))}
          </ul>
        )}
        {progressBar && (
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">{progressBar.label}</span>
              <span className="font-medium">{progressBar.value}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2.5">
              <div
                className="bg-white h-2.5 rounded-full"
                style={{ width: `${progressBar.value}%` }}
              ></div>
            </div>
          </div>
        )}
        {toggles && (
          <div className="space-y-4">
            {toggles.map((toggle, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="flex items-center">
                  {index === 0 && <Clock className="mr-2" />}
                  {index === 1 && <Layout className="mr-2" />}
                  {index === 2 && <Settings className="mr-2" />}
                  {toggle}
                </span>
                <div className="w-12 h-6 bg-green-400 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className={`mt-6 bg-white ${buttonColor} font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      content: t("home.testimonials.0.quote"),
      name: "Sarah J.",
      role: t("home.testimonials.0.role"),
      initials: "SJ",
      rating: 5,
    },
    {
      content: t("home.testimonials.1.quote"),
      name: "Michael C.",
      role: t("home.testimonials.1.role"),
      initials: "MC",
      rating: 4.5,
    },
    {
      content: t("home.testimonials.2.quote"),
      name: "Emily R.",
      role: t("home.testimonials.2.role"),
      initials: "ER",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          {t("home.sectionTitle")}{" "}
          <span className="text-purple-600">{t("home.sectionTitle2")}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(testimonial.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l5.46 4.73L4.82 19z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {testimonial.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
