import React, {useEffect, useState} from "react";
import MainWindow from "./MainContent/MainWindow.js";
import Tabs from "./MainContent/Tabs.js";
import {type TabDetails, LanguageContext, TabContext} from "../contexts.js";

export default function MainContent() {
  const storedTabs = localStorage.getItem("tabs")?.split(",")
    .filter((t) => t.length)
    .map((t) => {
      const details = t.split("_");
      return ({
        id: details[0],
        priority: details[1],
      } satisfies TabDetails);
    });
  const [lang, setLang] = useState<string>(localStorage.getItem("lang") ?? "en");
  const [tabs, setTabs] = useState<TabDetails[]>([]); //(storedTabs?.length ? storedTabs : []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("tabs", tabs.map((t) => `${t.id}_${t.priority}`).toString());
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
