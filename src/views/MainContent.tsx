import React, {useEffect, useState} from "react";
import MainWindow from "./MainContent/MainWindow.js";
import Tabs from "./MainContent/Tabs.js";

export const LanguageContext = React.createContext("en");

export default function MainContent() {
  const [tab, setTab] = useState("none");
  const [lang, setLang] = useState(localStorage.getItem("lang") ?? "en");
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="h-screen w-screen max-w-[1620px] m-auto lg:pl-[50px] lg:pr-[413px] lg:py-12">
      <LanguageContext.Provider value={lang}>
        <MainWindow setLang={setLang} tab={tab} setTab={setTab} />
        <Tabs tab={tab} setTab={setTab} />
      </LanguageContext.Provider>
    </div>
  );
}
