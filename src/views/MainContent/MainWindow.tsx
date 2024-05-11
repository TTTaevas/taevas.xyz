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
    <div className="bg-blue-600 text-white lg:border-solid lg:border-white lg:border-8 lg:rounded-xl lg:mb-8">
      <AnimateHeight
        id="intro"
        duration={300}
        height={tab === "none" ? "auto" : 0}
      >
        <div className="bg-white text-blue-600 rounded-b-xl relative justify-center items-center pb-4 pt-2 lg:pt-0 lg:px-4 hover:brightness-110">
          <Translatable
            en={<h1 className="text-6xl md:text-8xl font-bold">Hi, I'm Taevas!</h1>}
            fr={<h1 className="text-6xl md:text-8xl font-bold">Bonjour, je suis <span className="text-nowrap">Taevas !</span></h1>}
          />
          <h2 className="text-3xl font-bold pt-4 md:pt-2">
            <Translatable
              en={"If you're here, you're probably interested by who I am and what I do"}
              fr={"Si vous êtes ici, vous êtes alors probablement intéressé par qui je suis et ce que je fais"}
            />
          </h2>
        </div>
      </AnimateHeight>
      <div className="p-4">
        <SocialButtons/>
        <TabButtons
          setLang={setLang}
          setTab={setTab}
        />
      </div>
    </div>
  );
}
