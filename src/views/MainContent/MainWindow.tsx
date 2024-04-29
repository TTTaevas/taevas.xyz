import React from "react";
import AnimateHeight from "react-animate-height";

import TabButtons from "./MainWindow/TabButtons.js";
import SocialButtons from "./MainWindow/SocialButtons.js";

function MainWindow({
  lang,
  setLang,
  tab,
  setTab,
}: {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  let s = {
    hi: {
      en: "Hi, I'm Taevas!",
      fr: "Bonjour, je suis Taevas !",
    },
    why: {
      en: "If you're here, you're probably interested by who I am and what I do",
      fr: "Si vous êtes ici, vous êtes alors probablement intéressé par qui je suis et ce que je fais",
    },
  };

  return (
    <div className="bg-blue-600 text-white lg:border-solid lg:border-white lg:border-8 lg:rounded-xl p-4 lg:p-8 lg:mb-8">
      <AnimateHeight
        id="intro"
        duration={300}
        height={tab === "none" ? "auto" : 0}
      >
        <div className={"relative justify-center items-center mb-8"}>
          <h1 className="text-6xl md:text-8xl font-bold">{s.hi[lang]}</h1>
          <h2 className="text-3xl font-bold">{s.why[lang]}</h2>
        </div>
      </AnimateHeight>
      <SocialButtons/>
      <TabButtons
        lang={lang}
        setLang={setLang}
        setTab={setTab}
      />
    </div>
  );
}

export default MainWindow;
