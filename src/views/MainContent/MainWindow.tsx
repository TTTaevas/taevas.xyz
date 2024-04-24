import React from "react";
import AnimateHeight from 'react-animate-height';

import TabButton from "../../components/TabButton.js";

function MainWindow({
  lang,
  setLang,
  tab,
  setTab
}: {
  lang: string
  setLang: React.Dispatch<React.SetStateAction<string>>
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}) {
  let s = {
    hi: {
      en: "Hi, I'm Taevas!",
      fr: "Bonjour, je suis Taevas !"
    },
    why: {
      en: "If you're here, you're probably interested by who I am and what I do",
      fr: "Si vous êtes ici, vous êtes alors probablement intéressé par qui je suis et ce que je fais"
    },
    abt: {
      en: "About me",
      fr: "À propos de moi"
    },
    pro: {
      en: "My projects",
      fr: "Mes projets"
    },
    con: {
      en: "Contact me",
      fr: "Me contacter"
    },
    sup: {
      en: "Support me",
      fr: "Me soutenir"
    }
  }

  return (
    <div className="bg-blue-600 text-white lg:border-solid lg:border-white lg:border-8 lg:rounded-xl p-4 lg:p-8 lg:mb-8">
      <AnimateHeight
        id="intro"
        duration={300}
        height={tab === "none" ? "auto" : 0}
      >
        <div className={`relative justify-center items-center mb-8`}>
          <h1 className="text-6xl md:text-8xl font-bold">{s.hi[lang]}</h1>
          <h2 className="text-3xl font-bold">{s.why[lang]}</h2>
        </div>
      </AnimateHeight>
      <div className="relative justify-center items-center">
        <TabButton
          colors={"from-slate-500 to-slate-600 hover:from-slate-700 hover:to-slate-600"}
          onClick={() => {setLang(lang !== "en" ? "en" : "fr")}}
          content={lang === "fr" ? "🇬🇧" : "🇫🇷"}
        />
        <TabButton
          colors={"from-purple-500 to-purple-600 hover:from-purple-700 hover:to-purple-600"}
          onClick={() => {setTab("about")}}
          content={s.abt[lang]}
        />
        <TabButton
          colors={"from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-600"}
          onClick={() => {setTab("projects")}}
          content={s.pro[lang]}
        />
        <TabButton
          colors={"from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600"}
          onClick={() => {setTab("contact")}}
          content={s.con[lang]}
        />
        <TabButton
          colors={"from-rose-500 to-rose-600 hover:from-rose-700 hover:to-rose-600"}
          onClick={() => {setTab("support")}}
          content={s.sup[lang]}
        />
      </div>
    </div>
  );
}

export default MainWindow
