import React from "react";
import Tab from "../Tab.js";
import TextLink from "../Link/TextLink.js";
import Translatable from "../Translatable.js";

export default function Projects({
  tab,
  setTab,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const elements = [(
    <div className="inline-block m-4 text-white" key={"projects"}>
      <div className="border-4 p-4 m-4 max-w-3xl text-center bg-blue-700 transition hover:scale-105 hover:shadow-[0px_0_400px_400px_rgba(0,0,0,0.3)]">
        <a href="https://tttaevas.itch.io/swordventure" target="_blank" rel="noreferrer"><img className="m-4 float-right w-40" src="/swordventure.png" alt="SwordVenture thumbnail"/></a>
        <Translatable
          en={<p><b>SwordVenture</b> initially was <TextLink link="https://github.com/RemiL-Nel/Clicker-game" text="a game made by a friend in React which I helped develop,"/> but I've made the choice months later to <b>recode it from scratch in Godot</b>, a proper game engine!</p>}
          fr={<p><b>SwordVenture</b> était à la base <TextLink link="https://github.com/RemiL-Nel/Clicker-game" text="un jeu fait par un ami en React auquel j'ai contribué côté développement,"/> mais quelques mois plus tard, j'ai décidé de <b>le recoder en entier dans Godot</b>, qui est un véritable moteur de jeu vidéo !</p>}
        />
        <br/>
        <Translatable
          en={<p>This was my first experience in this engine, and development took me a little more than 100 hours, in the span of less than a month. While a little barebones, I'm still very satisfied with the result!</p>}
          fr={<p>C'était ma première fois avec ce moteur, et le développement m'a pris un peu plus de 100 heures en moins d'un mois. Bien qu'il n'y a au final pas trop de contenu dans le jeu, je suis tout de même très satisfait avec le résultat !</p>}
        />
        <br/>
        <Translatable
          en={<p>Although now, I'm left wondering how I'm gonna get the right assets for my next game, because for SwordVenture, I could just use the assets from the original project... I'm sure I will be able to figure it out!</p>}
          fr={<p>Mais maintenant, je me demande comment je vais faire pour obtenir des images/textures pour mon prochain jeu, parce que pour SwordVenture, je pouvais juste utiliser ceux du projet original... Je suis sûr que je vais finir par trouver !</p>}
        />
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center bg-blue-700 transition hover:scale-105 hover:shadow-[0px_0_400px_400px_rgba(0,0,0,0.3)]">
        <a href="https://kanaguessr.taevas.xyz" target="_blank" rel="noreferrer"><img className="m-4 float-left h-32" src="https://kanaguessr.taevas.xyz/favicon.png" alt="Kanaguessr logo"/></a>
        <Translatable
          en={<p>Working on kanaguessr is one of the first things I've done in 2021, and I essentially made it better in every aspect in early 2023.</p>}
          fr={<p>Travailler sur kanagessur est l'une des premières choses que j'ai faites en 2021, et je l'ai basiquement rendu meilleur sur tous les plans début 2023.</p>}
        />
        <br/>
        <Translatable
          en={<p>Back in 2020 or so, <b>I had found hiraganaquiz.com, and thought to myself it could be much better</b> without ads, with a less outdated design, and with better options to customize the user experience, and because the concept was simple, I've taken its concept and made kanaguessr! (although its name used to be KanaLearning)</p>}
          fr={<p>Aux alentours de 2020, <b>j'ai trouvé hiraganaquiz.com, et je me suis dit que ce site pourrait être meilleur</b> sans publicités, avec un design qui paraît moins vieux, et des meilleures options afin de customiser son expérience, et parce que le concept était simple, j'ai pris le concept du site et j'ai crée kanaguessr ! (bien que son nom à la base était KanaLearning)</p>}
        />
        <br/>
        <Translatable
          en={<p>It helped friends with remembering katakanas, so I'm glad I took the time to make and polish this webpage!</p>}
          fr={<p>Ça a aidé des amies à se souvenir des katakanas, donc je suis content d'avoir pris le temps de créer et de peaufiner cette page web !</p>}
        />
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center bg-blue-700 transition hover:scale-105 hover:shadow-[0px_0_400px_400px_rgba(0,0,0,0.3)]">
        <Translatable
          en={<p>Still in early 2023, I've made <TextLink link="https://github.com/TTTaevas/osu-api-v1-js" text="osu-api-v1-js"/>, my first JavaScript (TypeScript) package!</p>}
          fr={<p>Toujours début 2023, j'ai crée <TextLink link="https://github.com/TTTaevas/osu-api-v1-js" text="osu-api-v1-js"/>, mon premier package JavaScript (TypeScript) !</p>}
        />
        <br/>
        <Translatable
          en={<p>I've been using the first version of osu!'s API in several ways for years at this point, and yet I've never been using any package to make my life easier, I remember simply using axios directly and copypasting code between some of my projects. I never felt like using third party software to use such a simple API.</p>}
          fr={<p>J'avais déjà utilisé la première version de l'API d'osu! de multiples façons pendant des années à l'époque, et pourtant je n'ai jamais utilisé de package pour rendre ma vie plus simple, je me souviens que j'utilisais tout simplement axios et que je copiais/collais du code à travers mes projets. Je ne me suis jamais senti d'utiliser du code de quelqu'un d'autre pour utiliser une API aussi simple.</p>}
        />
        <br/>
        <Translatable
          en={<p>Yet it's not really great to keep writing the same code over and over again, so I used this excuse to finally try my hand at writing packages! I honestly think the result is great, it fully covers the API, is fully documented, and even makes things more intuitive and consistent, I literally don't know how I could make it better!</p>}
          fr={<p>Et pourtant ce n'est pas vraiment génial de continuer à écrire le même code encore et encore, alors j'ai utilisé cette excuse pour enfin m'essayer à écrire des packages ! Et je pense honnêtement que le résultat est très bon, il couvre complètement l'API, est complètement documenté, et rend même certaines choses encore plus intuitives et consistentes, je ne sais même pas comment je pourrais le rendre meilleur !</p>}
        />
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center bg-blue-700 transition hover:scale-105 hover:shadow-[0px_0_400px_400px_rgba(0,0,0,0.3)]">
        <a href="https://finder.taevas.xyz" target="_blank" rel="noreferrer"><img className="m-4 float-right h-16" src="https://finder.taevas.xyz/Webpage/favicon.png" alt="Website-Finder logo"/></a>
        <Translatable
          en={<p>...Website-Finder is actually an odd one. What started off in 2020 as <TextLink link="https://gitlab.com/Isterix/rif2" text="a simple Ruby script that downloads images from every webpage it can find,"/> became a way for me to experiment with different programming languages and their networking capabilities, without dependencies.</p>}
          fr={<p>...Website-Finder est en fait assez étrange. Ce qui a commencé en 2020 en tant que <TextLink link="https://gitlab.com/Isterix/rif2" text="simple script Ruby qui télécharge les images de chaque page web qu'il peut trouver,"/> est devenu une façon pour moi de jouer avec differents langages de programmation et leures capacités en terme d'accès à internet.</p>}
        />
        <br/>
        <Translatable
          en={<p>I love the concept of a program finding 100% random websites in the wild for you, and that made me want to share the project with other people who would not really know how to run (or even choose!) any script, so in 2023, I redesigned the webpage version of the program, which is the only version with some sort of GUI.</p>}
          fr={<p>J'adore le concept d'un programme qui trouve pour vous des sites web 100% aléatoires, et ça m'a donné envie de partager le projet avec d'autres personnes qui ne sauraient pas vraiment comment faire tourner (ou même choisir !) un script, alors en 2023, j'ai redesigné la version web du programme, qui est la seule version avec une interface graphique de quelque sorte.</p>}
        />
        <br/>
        <Translatable
          en={<p>From what I remember, some people didn't actually like the design of the webpage, yet I think it's the best design I've ever managed to make for any website!</p>}
          fr={<p>De ce que je me rappelle, certaines personnes n'ont pas aimé le design de la page web, mais je pense pourtant que c'est le meilleur design que j'ai réussi à créer pour n'importe quel site web !</p>}
        />
        <br/>
        <Translatable
          en={<p>I must have weird tastes or something.</p>}
          fr={<p>Je dois avoir des goûts bizarres.</p>}
        />
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center bg-blue-700 transition hover:scale-105 hover:shadow-[0px_0_400px_400px_rgba(0,0,0,0.3)]">
        <Translatable
          en={<p>So <TextLink link="https://github.com/TTTaevas/osu-api-v2-js" text="osu-api-v2-js"/> is something I've had to work on during three different and distinct periods. I started working on it in March 2023 roughly around the time I finished working on osu-api-v1-js, then I took a break and worked on it again in November 2023, only to finally finish it in March 2024.</p>}
          fr={<p>Alors <TextLink link="https://github.com/TTTaevas/osu-api-v2-js" text="osu-api-v2-js"/>, c'est quelque chose sur lequel j'ai dû travailler durant 3 périodes bien différentes, en commençant en Mars 2023 genre quand j'ai fini osu-api-v1-js, puis Novembre 2023 après une pause, puis enfin Mars 2024 après une autre pause.</p>}
        />
        <br/>
        <Translatable
          en={<p>The reason why I took so long is that the task at hand was actually really difficult, as this software is an api wrapper that aimed to provide the best type safety possible while being feature-complete, for an API that is not entirely documented and is everchanging! And if you're wondering why I even bothered finishing this project, that's because I just hate unfinished projects.</p>}
          fr={<p>La raison pour laquelle j'ai pris tellement longtemps est que ce projet était en fait très difficile, car ce package est un api wrapper qui voulait un maximum de type safety tout en étant complet, pour une API qui n'était pas entièrement documentée et en éternel changement ! Et si vous vous demandez pourquoi je me suis embêté à finir ce projet, c'est parce que je déteste laisser des projets à l'abandon, sans qu'ils puissent être finis.</p>}
        />
        <br/>
        <Translatable
          en={<p>Now that it's finished, I know it'll definitely help <i>someone</i> in the future, let it be someone I don't know, a friend, or even myself! And with that peace of mind, I can safely move on to another project, while keeping an eye out for potential issues that would get opened on this project's repository!</p>}
          fr={<p>Avec ça de fait, je sais pour sûr que ça aidera <i>quelqu'un</i> à un moment, que ce soit quelqu'un que je ne connais pas, un ami, ou même moi-même ! Et c'est ainsi que je peux m'occuper d'un tout autre projet, tout en gardant l'oeil ouvert pour des issues GitHub sur le repo de ce projet !</p>}
        />
      </div>
    </div>
  )];

  return (
    <Tab
      tab={tab}
      setTab={setTab}
      id="projects"
      name={
        <Translatable
          en={"Projects"}
          fr={"Projets"}
        />
      }
      elements={elements}
      image="/cds/devices.svg"
    />
  );
}
