import React from "react";

import TabButton from "../../../components/TabButton.js";

function TabButtons({
  lang,
  setLang,
  setTab,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  let s = {
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
    <div className="relative justify-center items-center">
      <TabButton
        colors={"from-slate-500 to-slate-600 hover:from-slate-700 hover:to-slate-600"}
        onClick={() => {
          setLang(lang !== "en" ? "en" : "fr");
        }}
        content={lang === "fr" ? "🇬🇧" : "🇫🇷"}
      />
      <TabButton
        colors={"from-purple-500 to-purple-600 hover:from-purple-700 hover:to-purple-600"}
        onClick={() => {
          setTab("about");
        }}
        content={s.abt[lang]}
      />
      <TabButton
        colors={"from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-600"}
        onClick={() => {
          setTab("projects");
        }}
        content={s.pro[lang]}
      />
      <TabButton
        colors={"from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600"}
        onClick={() => {
          setTab("contact");
        }}
        content={s.con[lang]}
      />
      <TabButton
        colors={"from-rose-500 to-rose-600 hover:from-rose-700 hover:to-rose-600"}
        onClick={() => {
          setTab("support");
        }}
        content={s.sup[lang]}
      />
    </div>
  );
}

export default TabButtons;
