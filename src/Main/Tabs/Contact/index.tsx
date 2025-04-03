import React from "react";
import Tab from "../Tab.tsx";
import {MailAll} from "@carbon/icons-react";
import CopyField from "#parts/CopyField.tsx";
import ButtonLink from "#parts/ButtonLink.tsx";
import Translatable from "#parts/Translatable.tsx";
import Link from "#parts/Link.tsx";
import {type TabDetails} from "#contexts";

export default function Contact({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<TabDetails[]>>;
}) {
  const elements = [(
    <div className="m-4 text-white text-left" key={"contact"}>
      <Translatable
        en={<p>It is my belief that it's actually difficult to communicate with the people you want on the internet, I find emails to be bad for real-time communication, some other platforms enshittify themselves too much, while others do not quite offer the best user experience in my honest opinion.</p>}
        fr={<p>Je pense en fait que c'est difficile de communiquer avec les gens qu'on veut sur internet, je trouve que les e-mails ne conviennent pas pour la communication en temps réel, certaines plateformes deviennent horribles, pendant que d'autres n'offrent pas vraiment une bonne expérience.</p>}
      />
      <br/>
      <Translatable
        en={<p>And yet, if I want people to easily contact me and make communication with them convenient, then I need to settle on <i>something!</i></p>}
        fr={<p>Et pourtant, si je veux que les gens puissent me contacter facilement, et que la communication soit facile, alors je dois bien choisir <i>quelque chose !</i></p>}
      />
      <br/>
      <Translatable
        en={<p className="text-center">So, I've decided to go for <Link link="https://matrix.org/" text="the Matrix protocol!"/> Feel free to get in touch with me on this account:</p>}
        fr={<p className="text-center">Alors, j'ai opté pour <Link link="https://matrix.org/" text= "le protocole Matrix !"/> N'hésitez pas à entrer en contact avec moi sur ce compte :</p>}
      />
      <CopyField text="@taevas:matrix.org" imageUrl="assets/logos/matrix.svg"/>
      <Translatable
        en={<ButtonLink link="https://matrix.to/#/@taevas:matrix.org" text="matrix.to link" />}
        fr={<ButtonLink link="https://matrix.to/#/@taevas:matrix.org" text="lien matrix.to" />}
      />
    </div>
  )];

  return (
    <Tab
      setTabs={setTabs}
      id="contact"
      name={
        <Translatable
          en={"Contact"}
          fr={"Contacter"}
        />
      }
      elements={elements}
      logo={<MailAll size={48} fill=""/>}
      position="lg:left-[400px] lg:top-[300px]"
    />
  );
}
