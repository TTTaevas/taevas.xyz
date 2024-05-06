import React, {useEffect, useState} from "react";

import MainWindow from "./MainContent/MainWindow.js";
import Tabs from "./MainContent/Tabs.js";

export default function MainContent() {
  const [tab, setTab] = useState("none");
  const [lang, setLang] = useState(localStorage.getItem("lang") ?? "en");
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div id="tabs" className="w-screen h-screen my-auto m-auto lg:pl-[50px] lg:pr-[413px] lg:py-12 max-w-screen-2xl">
      <MainWindow lang={lang} setLang={setLang} tab={tab} setTab={setTab} />
      <Tabs lang={lang} tab={tab} setTab={setTab} />
    </div>
  );
}
