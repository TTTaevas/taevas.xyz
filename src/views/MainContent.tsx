import React, {useEffect, useState} from "react";
import MainWindow from "./MainContent/MainWindow.js";
import Tabs from "./MainContent/Tabs.js";

export const LanguageContext = React.createContext<string>("en");
export const TabContext = React.createContext<string[]>([]);

export default function MainContent() {
  const storedTabs = localStorage.getItem("tabs")?.split(",").filter((t) => t.length);
  const [tabs, setTabs] = useState<string[]>(storedTabs?.length ? storedTabs : []);
  const [lang, setLang] = useState<string>(localStorage.getItem("lang") ?? "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("tabs", tabs.toString());
  }, [tabs]);

  return (
    <div className="h-screen w-screen max-w-[1632px] m-auto lg:pl-[50px] lg:pr-[413px] lg:py-12">
      <LanguageContext.Provider value={lang}>
        <TabContext.Provider value={tabs}>
          <MainWindow setLang={setLang} setTabs={setTabs}/>
          <Tabs setTabs={setTabs}/>
        </TabContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
}
