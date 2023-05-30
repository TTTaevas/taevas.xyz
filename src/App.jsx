import React, { useEffect, useState } from "react";
import "./App.css";
import Infos from "./components/Infos";

function App() {
  let [lang, setLang] = useState(localStorage.getItem("lang") || "en")
  useEffect(() => {localStorage.setItem("lang", lang)}, [lang])

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
    <div className="App h-screen bg-gradient-to-b from-sky-500 to-white md:flex">
      <div className="w-screen h-screen my-auto md:p-8 lg:p-12 mr-[363px]">
        <div className="relative justify-center items-center mb-8">
          <h1 className="text-8xl font-bold">{s.hi[lang]}</h1>
          <h2 className="text-3xl font-bold">{s.why[lang]}</h2>
        </div>
        <div className="relative justify-center items-center">
          <button className="text-xl text-white bg-black m-2 p-4 border-solid border-white border-3 rounded-md
          bg-gradient-to-t from-70% from-slate-500 to-slate-600 hover:from-slate-700 hover:to-slate-600"
          onClick={() => {setLang(lang !== "en" ? "en" : "fr")}}>
            {lang === "fr" ? "🇬🇧" : "🇫🇷"}
          </button>
          <button className="text-xl text-white bg-black m-2 p-4 border-solid border-white border-3 rounded-md
          bg-gradient-to-t from-70% from-purple-500 to-purple-600 hover:from-purple-700 hover:to-purple-600">{s.abt[lang]}</button>
          <button className="text-xl text-white bg-black m-2 p-4 border-solid border-white border-3 rounded-md
          bg-gradient-to-t from-70% from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-600">{s.pro[lang]}</button>
          <button className="text-xl text-white bg-black m-2 p-4 border-solid border-white border-3 rounded-md
          bg-gradient-to-t from-70% from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-600">{s.con[lang]}</button>
          <button className="text-xl text-white bg-black m-2 p-4 border-solid border-white border-3 rounded-md
          bg-gradient-to-t from-70% from-rose-500 to-rose-600 hover:from-rose-700 hover:to-rose-600">{s.sup[lang]}</button>
        </div>
      </div>
      <div>
        <Infos />
      </div>
    </div>
  );
}

export default App;
