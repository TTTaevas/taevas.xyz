import React from "react";
import Tab from "../Tab.js";
import Translatable from "../Translatable.js";
import {UserProfile} from "@carbon/icons-react";

export default function About({
  tab,
  setTab,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const elements = [(
    <div className="m-4 text-white" key={"about"}>
      <div className="ml-auto max-w-3xl text-center">
        <img className="m-4 float-right h-32" src="/brittany.jpg" alt="Flag of Brittany" title="Flag of Brittany"/>
        <Translatable
          en={<p>o/ <b>I'm Taevas</b> (rough IPA: /taɛvæs/) and I am a young person from <b>Brittany</b> who is currently invested in programming, more specifically <b>game development, web development, networking, and cybersecurity.</b></p>}
          fr={<p>o/ <b>Je suis Taevas</b> (IPA approximatif: /taɛvæs/) et je suis une jeune personne de <b>Bretagne</b> qui s'investit pour le moment dans la programmation, plus spécifiquement le <b>développmenet de jeux-vidéos, le développement web, et ce qui touche aux réseaux et la cybersécurité.</b></p>}
        />
        <br/>
        <Translatable
          en={<p>I am also somewhat skilled in more common stuff, such as <b>spreadsheeting, video-editing, and even playing specific video games</b>, so far as to speedrun them or to play them competitively!</p>}
          fr={<p>J'ai aussi quelques compétences dans des trucs plus commun, tels que pour <b>les tableurs, le montage vidéo, et même jouer à certains jeux vidéos</b>, jusqu'à même les "speedrun" ou les jouer de façon compétitive !</p>}
        />
        <br/>
        <Translatable
          en={<p>In the recent past, I have organized, helped with organizing, and played in many tournaments on osu!, a popular rhythm game.</p>}
          fr={<p>Jusqu'à récemment, j'ai organisé, aidé avec l'organisation, et joué dans beaucoup de tournois sur osu!, un jeu de rhythme plutôt connu.</p>}
        />
      </div>
      <div className="mr-auto mt-8 max-w-3xl text-center">
        <a href="https://www.pixiv.net/en/artworks/85330094" target="_blank" rel="noreferrer">
          <img className="m-4 float-left h-32 w-32" src="/lain.png" alt="Drawing of Lain" title="Lain"/>
        </a>
        <Translatable
          en={<p>I really like Japanese media! Often if not always, I'll choose to have a drawing of <b>Lain Iwakura from Serial Experiments Lain</b>, a piece of media I deeply enjoy, as my profile picture on the various websites I have an account on.</p>}
          fr={<p>J'aime beaucoup les médias du Japon ! Souvent, si ce n'est toujours, j'ai un dessin de <b>Lain Iwakura de Serial Experiments Lain</b>, un anime qui m'est cher, en tant qu'image de profil sur les sites web où j'ai un compte.</p>}
        />
        <br/>
        <Translatable
          en={<p>If you're on a large screen, you can find out <b>my latest activities on the web on the right side of the screen on this website</b>, including a tracker for the music I listen to and the animes I watch. I haven't found a cool tracker for western media yet, let me know if you know any!</p>}
          fr={<p>Si vous êtes sur un écran large, vous pouvez voir <b>mes dernières activiés sur Internet à droite de l'écran sur ce site</b>, tel qu'un traqueur pour la musique que j'écoute et les animes que je regarde. J'ai pas encore trouvé de bon traqueur pour les médias style séries TV ou films, faites-moi savoir si vous en connaissez un !</p>}
        />
        <br/>
        <Translatable
          en={<p>If you have any question you would like to ask me, don't hesitate to contact me!</p>}
          fr={<p>Si vous avez une question que vous aimeriez me demander, n'hésitez pas à me contacter !</p>}
        />
      </div>
    </div>
  )];

  return (
    <Tab
      tab={tab}
      setTab={setTab}
      id="about"
      name={
        <Translatable
          en={"About"}
          fr={"À propos"}
        />
      }
      elements={elements}
      logo={<UserProfile size={48}/>}
    />
  );
}
