import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t("home.footer.sections.features.title"),
      items: t("home.footer.sections.features.items", { returnObjects: true }),
    },
    {
      title: t("home.footer.sections.company.title"),
      items: t("home.footer.sections.company.items", { returnObjects: true }),
    },
    {
      title: t("home.footer.sections.legal.title"),
      items: t("home.footer.sections.legal.items", { returnObjects: true }),
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-50 via-pink-100 to-purple-200 text-gray-600 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-50 opacity-50"></div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-6 group">
              <div
                className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: "#C050D5" }}
              >
                {/* Empty button */}
              </div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-[#C050D5] transition-colors duration-300">
                Taskly
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-6">
              {t("home.footer.sections.taskly.description")}
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="text-gray-500 hover:text-[#C050D5] transition-colors duration-300"
                  aria-label={`Link to ${Icon.name}`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to="/"
                      className="hover:text-[#C050D5] transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-purple-200 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Taskly.{" "}
            {t("home.footer.copyright")} .
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-100 via-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-100 via-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
    </footer>
  );
}
