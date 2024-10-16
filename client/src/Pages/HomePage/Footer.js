import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Taskly</h3>
            <p className="text-sm text-gray-400">{t("home.footer.sections.taskly.description")}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("home.footer.sections.features.title")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition duration-200">{t("home.footer.sections.features.items.0")}</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-200">{t("home.footer.sections.features.items.1")}</Link></li>
              <li><Link to="/" className="hover:text-white transition duration-200">{t("home.footer.sections.features.items.2")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("home.footer.sections.company.title")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition duration-200">{t("home.footer.sections.company.items.0")}</Link></li>
              <li><Link to="/careers" className="hover:text-white transition duration-200">{t("home.footer.sections.company.items.1")}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition duration-200">{t("home.footer.sections.company.items.2")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("home.footer.sections.legal.title")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white transition duration-200">{t("home.footer.sections.legal.items.0")}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition duration-200">{t("home.footer.sections.legal.items.1")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Taskly. {t("home.footer.copyright")}.</p>
        </div>
      </div>
    </footer>
  )
}