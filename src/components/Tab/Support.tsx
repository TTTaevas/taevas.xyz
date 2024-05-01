import React from "react";
import Tab from "../Tab.js";

function Support({
  lang,
  tab,
  setTab,
}: {
  lang: string;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const s = {
    name: {
      en: "support",
      fr: "soutenir",
    },
    thanks: {
      en: "Thanks for even considering supporting me!",
      fr: "Déjà, merci d'envisager de me soutenir !",
    },
    need: {
      en: "Monthly, I would basically only need $3 from 2 people to keep doing what I like without losing much money!",
      fr: "En gros, je n'aurais besoin que de $3 de 2 personnes par mois pour que je puisse continuer de faire ce que j'aime sans perdre top d'argent !",
    },
    where: {
      en: "Only if you want and if you can, you may support me through my Ko-fi page:",
      fr: "Seulement si vous le souhaitez et si vous le pouvez, alors vous pouvez me soutenir sur ma page Ko-fi :",
    },
  };
  const elements = [(
    <div className="m-4 pb-2 text-white">
      <p><b>{s.thanks[lang]}</b></p>
      <br/>
      <p>{s.need[lang]}</p>
      <p>{s.where[lang]}</p>
      <a href='https://ko-fi.com/V7V4J78L0' target='_blank' rel="noreferrer">
        <img className="h-12 mx-auto my-2" src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' alt='Support me on Ko-fi!' />
      </a>
    </div>
  )];
  return (
    <Tab tab={tab} setTab={setTab} id="support" name={s.name[lang]} elements={elements} image="/cds/user--favorite.svg"/>
  );
}

export default Support;
