import React from "react";
import Tab from "../Tab.js";
import Translatable from "#parts/Translatable.js";
import {UserFavorite} from "@carbon/icons-react";
import {type TabDetails} from "#contexts";
import ButtonLink from "#parts/ButtonLink.js";

export default function Support({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<TabDetails[]>>;
}) {
  const elements = [(
    <div className="m-4 pb-2 text-white" key={"support"}>
      <p>
        <b>
          <Translatable
            en={"Thank you for wanting to support me!"}
            fr={"Déjà, merci de vouloir me soutenir !"}
          />
        </b>
      </p>
      <br/>
      <Translatable
        en={<p>If you like what I do, donating some money would allow me to do even more without worrying <i>too much</i> about spending money for that purpose.</p>}
        fr={<p>Si vous aimez ce que je fais, me donner un peu d'argent me permettrait de faire encore plus sans <i>trop</i> me soucier de dépenser de l'argent pour ça.</p>}
      />
      <br/>
      <p>
        <Translatable
          en={"Only if you want and can, you may go on my Ko-fi page to give me some monetary support:"}
          fr={"Seulement si vous le souhaitez et le pouvez, alors vous pouvez aller sur ma page Ko-fi afin de me faire un petit don d'argent :"}
        />
      </p>
      <Translatable
        en={<ButtonLink link="https://ko-fi.com/taevas" text="Support me on Ko-fi!" />}
        fr={<ButtonLink link="https://ko-fi.com/taevas" text="Soutenez-moi sur Ko-fi !"/>}
      />
    </div>
  )];

  return (
    <Tab
      setTabs={setTabs}
      id="support"
      name={
        <Translatable
          en={"Support"}
          fr={"Soutenir"}
        />
      }
      elements={elements}
      logo={<UserFavorite size={48} fill=""/>}
      position="lg:left-[550px] lg:top-[350px]"
    />
  );
}
