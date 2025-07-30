import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { t, i18n } = useTranslation();
  // let words = {
  //   hello: t("hello"),
  //   buttonText: t("buttonText"),
  // };
  return (
    <div>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
      <h1>{t("hello")}</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
