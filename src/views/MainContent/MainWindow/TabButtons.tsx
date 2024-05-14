import React from "react";
import TabButton from "../../../components/TabButton.js";
import Translatable from "../../../components/Translatable.js";
import {LanguageContext, TabContext} from "../../MainContent.js";

export default function TabButtons({
  setLang,
  setTabs,
}: {
  setLang: React.Dispatch<React.SetStateAction<string>>;
  setTabs: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const lang = React.useContext(LanguageContext);
  const tabs = React.useContext(TabContext);

  const toggleTab = (tab: string) => {
    if (tabs.includes(tab)) {
      setTabs(tabs.filter((t) => t !== tab));
    } else {
      setTabs([...tabs, tab]);
    }
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
        colors={`from-purple-500 to-purple-600 hover:from-purple-700 hover:to-purple-600 ${tabs.includes("about") ? "brightness-75" : ""}`}
        onClick={() => {
          toggleTab("about");
        }}
        content={
          <Translatable
            en={"About me"}
            fr={"À propos de moi"}
          />
        }
      />
      <TabButton
        colors={`from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-600 ${tabs.includes("projects") ? "brightness-75" : ""}`}
        onClick={() => {
          toggleTab("projects");
        }}
        content={
          <Translatable
            en={"My projects"}
            fr={"Mes projets"}
          />
        }
      />
      <TabButton
        colors={`from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600 ${tabs.includes("contact") ? "brightness-75" : ""}`}
        onClick={() => {
          toggleTab("contact");
        }}
        content={
          <Translatable
            en={"Contact me"}
            fr={"Me contacter"}
          />
        }
      />
      <TabButton
        colors={`from-rose-500 to-rose-600 hover:from-rose-700 hover:to-rose-600 ${tabs.includes("support") ? "brightness-75" : ""}`}
        onClick={() => {
          toggleTab("support");
        }}
        content={
          <Translatable
            en={"Support me"}
            fr={"Me soutenir"}
          />
        }
      />
    </div>
  );
}
