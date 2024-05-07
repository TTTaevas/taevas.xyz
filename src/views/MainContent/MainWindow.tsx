import React from "react";
import AnimateHeight from "react-animate-height";

import TabButtons from "./MainWindow/TabButtons.js";
import SocialButtons from "./MainWindow/SocialButtons.js";
import Translatable from "../../components/Translatable.js";

export default function MainWindow({
  setLang,
  tab,
  setTab,
}: {
  setLang: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="bg-blue-600 text-white lg:border-solid lg:border-white lg:border-8 lg:rounded-xl p-4 lg:p-8 lg:mb-8">
      <AnimateHeight
        id="intro"
        duration={300}
        height={tab === "none" ? "auto" : 0}
      >
        <div className={"relative justify-center items-center mb-8"}>
          <h1 className="text-6xl md:text-8xl font-bold">
            <Translatable
              en={"Hi, I'm Taevas!"}
              fr={"Bonjour, je suis Taevas !"}
            />
          </h1>
          <h2 className="text-3xl font-bold">
            <Translatable
              en={"If you're here, you're probably interested by who I am and what I do"}
              fr={"Si vous êtes ici, vous êtes alors probablement intéressé par qui je suis et ce que je fais"}
            />
          </h2>
        </div>
      </AnimateHeight>
      <SocialButtons/>
      <TabButtons
        setLang={setLang}
        setTab={setTab}
      />
    </div>
  );
}
