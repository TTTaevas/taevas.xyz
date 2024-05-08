import React from "react";
import Tab from "../Tab.js";
import CopyField from "../CopyField.js";
import ButtonLink from "../Link/ButtonLink.js";
import Translatable from "../Translatable.js";

export default function Contact({
  tab,
  setTab,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const elements = [(
    <div className="m-4 pb-2 text-white text-left" key={"contact"}>
      <Translatable
        en={<p>It's... kinda difficult to communicate with the people you want on the internet, I find emails to not be ideal for real-time communication, some other platforms I won't name enshittify themselves, while others do not quite offer the best user experience in my honest opinion.</p>}
        fr={<p>C'est... plutôt difficile de communiquer avec les gens qu'on veut sur internet, je trouve que les e-mails ne sont pas idéaux pour la communication en temps réel, certaines plateformes dont je ne dirais pas le nom sont devenues horribles, pendant que d'autres n'offrent pas vraiment la meilleure expérience à l'utilisateur, en tout cas je pense.</p>}
      />
      <br/>
      <Translatable
        en={<p>And yet, if I want people to easily contact me, and make communication with them convenient, then I need to settle on <i>something!</i></p>}
        fr={<p>Et pourtant, si je veux que les gens puissent me contacter facilement, et que la communication soit facile, alors je dois bien choisir <i>quelque chose !</i></p>}
      />
      <br/>
      <Translatable
        en={<p className="text-center">So, I've decided to go for the Matrix protocol! Feel free to DM me on this account:</p>}
        fr={<p className="text-center">Alors, j'ai opté pour le protocole Matrix ! N'hésitez pas à m'envoyer un message sur ce compte :</p>}
      />
      <CopyField text="@taevas:matrix.org" imageUrl="/logos/matrix.svg"/>
      <Translatable
        en={<p className="text-center"><ButtonLink link="https://matrix.to/#/@taevas:matrix.org" text="(matrix.to link)" /></p>}
        fr={<p className="text-center"><ButtonLink link="https://matrix.to/#/@taevas:matrix.org" text="(lien matrix.to)" /></p>}
      />
      <br/>
      <Translatable
        en={<p className="text-center">If you don't feel like using this protocol though, know that my Discord account hasn't gone inactive just yet:</p>}
        fr={<p className="text-center">Si vous ne vous sentez pas d'utiliser ce protocole, sachez que mon compte Discord n'est pas encore totalement inactif :</p>}
      />
      <CopyField text="taevas9730" imageUrl="/logos/discord.svg"/>
    </div>
  )];

  return (
    <Tab
      tab={tab}
      setTab={setTab}
      id="contact"
      name={
        <Translatable
          en={"Contact"}
          fr={"Contacter"}
        />
      }
      elements={elements}
      image="/cds/mail--all.svg"
    />
  );
}
