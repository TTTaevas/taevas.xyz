import React from "react";
import Tab from "../Tab.js";
import Translatable from "#parts/Translatable.js";
import {UserProfile} from "@carbon/icons-react";
import {type TabDetails} from "#contexts";
import Link from "#parts/Link.js";

export default function About({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<TabDetails[]>>;
}) {
  const elements = [(
    <div className="m-4 text-white order-1" key={"about"}>
      <div className="ml-auto max-w-3xl text-left">
        <img className="m-4 float-right h-24" src="/brittany.jpg" alt="Flag of Brittany" title="Flag of Brittany"/>
        <Translatable
          en={<p>o/ <b>I'm Taevas</b>, a young person from <b><Link link="https://en.wikipedia.org/wiki/Brittany" text="Brittany"/> (western France)</b> who is currently invested in <b>game development.</b> I also do stuff related to web development, networking, and cybersecurity more rarely!</p>}
          fr={<p>o/ <b>Je m'appelle Taevas</b>, je suis une jeune personne de <b>Bretagne</b> qui s'investit dans le <b>développement de jeux-vidéos.</b> Je fais aussi des trucs qui touchent au développement web, aux réseaux, et plus rarement à la cybersécurité!</p>}
        />
        <br/>
        <Translatable
          en={<p>I also have some skills in more common stuff, like with <b>spreadsheeting, video-editing, and even playing specific video games</b>, so far as to speedrun them or to play them competitively!</p>}
          fr={<p>J'ai aussi quelques compétences dans des trucs plus communs, tels que pour <b>les spreadsheets, le montage vidéo, et même jouer à certains jeux vidéos</b> jusqu'à même les "speedrun" ou les jouer de façon compétitive !</p>}
        />
        <br/>
        <Translatable
          en={<p>Previously, I have also organized, helped with organizing, and played in many community-run tournaments on <Link link="https://osu.ppy.sh/" text="osu!"/>, a popular rhythm game.</p>}
          fr={<p>Auparavant, j'ai aussi organisé, aidé avec l'organisation, et joué dans beaucoup de tournois sur <Link link="https://osu.ppy.sh/" text="osu!"/>, un jeu de rhythme plutôt connu.</p>}
        />
      </div>
      <div className="mr-auto mt-8 max-w-3xl text-right">
        <a href="https://www.pixiv.net/en/artworks/85330094" target="_blank" rel="noreferrer">
          <img className="m-4 float-left h-24 w-24" src="/lain.png" alt="A drawing of Lain" title="A drawing of Lain"/>
        </a>
        <Translatable
          en={<p>I really like Japanese media! I'll pretty much always choose to have some drawing of <b>Lain Iwakura from <Link link="https://en.wikipedia.org/wiki/Serial_Experiments_Lain" text="Serial Experiments Lain"/></b> as my profile picture on the various websites I have an account on, as it is a piece of media I deeply enjoy.</p>}
          fr={<p>J'aime beaucoup les médias du Japon ! Quand possible, j'ai un dessin de <b>Lain Iwakura de <Link link="https://en.wikipedia.org/wiki/Serial_Experiments_Lain" text="Serial Experiments Lain"/></b>, un anime qui m'est cher, en tant qu'image de profil sur les sites web où j'ai un compte.</p>}
        />
        <br/>
        <Translatable
          en={<p>You can find out <b>my latest web activities on the right side of the screen on this website</b>, including a tracker for the music I listen to and the animes I watch. I haven't found a good tracker for films or series yet, let me know if you know any!</p>}
          fr={<p>Vous pouvez voir <b>mes dernières activiés sur Internet à droite de l'écran sur ce site</b>, tel qu'un traqueur pour la musique que j'écoute et les animes que je regarde. J'ai pas encore trouvé de bon traqueur pour les médias style séries TV ou films, faites-moi savoir si vous en connaissez un !</p>}
        />
        <br/>
        <Translatable
          en={<p className="text-center">Feel free to get in touch with me for any reason you want!</p>}
          fr={<p className="text-center">N'hésitez pas à entrer en contact avec moi si vous le souhaitez !</p>}
        />
      </div>
    </div>
  )];

  return (
    <Tab
      setTabs={setTabs}
      id="about"
      name={
        <Translatable
          en={"About"}
          fr={"À propos"}
        />
      }
      elements={elements}
      logo={<UserProfile size={48} fill=""/>}
      position="lg:left-[100px] lg:top-[200px]"
    />
  );
}
