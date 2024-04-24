import React, {useEffect, useState} from "react";

import MainWindow from "./MainContent/MainWindow.js";
import Tabs from "./MainContent/Tabs.js";

function MainContent() {
  let [tab, setTab] = useState("none");
  let [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  let s = {
    hi: {
      en: "Hi, I'm Taevas!",
      fr: "Bonjour, je suis Taevas !",
    },
    why: {
      en: "If you're here, you're probably interested by who I am and what I do",
      fr: "Si vous êtes ici, vous êtes alors probablement intéressé par qui je suis et ce que je fais",
    },
    abt: {
      en: "About me",
      fr: "À propos de moi",
    },
    pro: {
      en: "My projects",
      fr: "Mes projets",
    },
    con: {
      en: "Contact me",
      fr: "Me contacter",
    },
    sup: {
      en: "Support me",
      fr: "Me soutenir",
    },
  };

  return (
    <div id="tabs" className="w-screen h-screen my-auto m-auto lg:pl-[50px] lg:pr-[413px] lg:py-12 max-w-screen-2xl">
      <MainWindow lang={lang} setLang={setLang} tab={tab} setTab={setTab} />
      <Tabs lang={lang} tab={tab} setTab={setTab} />
    </div>
  );
}

export default MainContent;
