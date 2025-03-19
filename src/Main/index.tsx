import React, {useEffect, useState} from "react";
import MainWindow from "./MainWindow/index.tsx";
import Tabs from "./Tabs/index.tsx";
import {type TabDetails, LanguageContext, TabContext} from "#contexts";

export default function MainContent() {
  const [lang, setLang] = useState<string>(localStorage.getItem("lang") ?? "en");
  const [tabs, setTabs] = useState<TabDetails[]>([]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="text-lg/6 h-screen w-screen max-w-[1632px] m-auto lg:pl-[50px] lg:pr-[413px] lg:py-12">
      <LanguageContext.Provider value={lang}>
        <TabContext.Provider value={tabs}>
          <MainWindow setLang={setLang} setTabs={setTabs}/>
          <Tabs setTabs={setTabs}/>
        </TabContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
}
