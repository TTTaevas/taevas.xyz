import React from "react";
import Tab from "./structure";

function Projects({
  lang,
  tab,
  setTab
}: {
  lang: string,
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}) {
  let s = {
    name: {
      en: "projects",
      fr: "projets"
    }
  }
  let elements = [(
    <div className="inline-block m-4 text-white">
      <div className="border-4 p-4 m-4 max-w-3xl text-center">
        <iframe className="float-right m-4" src="https://itch.io/embed/2295061?border_width=5&amp;bg_color=1d0e11&amp;fg_color=ffffff&amp;link_color=32c400&amp;border_color=6c5129" width="560" height="175"><a href="https://tttaevas.itch.io/swordventure">SwordVenture by Taevas</a></iframe>
        <p><b>SwordVenture</b> initially was <a href="https://github.com/RemiL-Nel/Clicker-game" target="_blank">a game made by a friend in React which I helped develop,</a> but I've made the choice months later to <b>recode it from scratch in Godot</b>, a proper game engine!</p>
        <br/>
        <p>This was my first experience in this engine, and development took me a little more than 100 hours, in the span of less than a month. While a little barebones, I'm still very satisfied with the result!</p>
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center">
        <a href="https://kanaguessr.taevas.xyz" target="_blank"><img className="m-4 float-left h-32" src="https://kanaguessr.taevas.xyz/favicon.png" alt="Kanaguessr logo"/></a>
        <p>Working on kanaguessr is one of the first things I've done in 2021, and I essentially made it better in every aspect in early 2023.</p>
        <br/>
        <p>Back in 2020 or so, <b>I had found hiraganaquiz.com, and thought to myself it could've been much better</b> without ads, with a less outdated design, and with better options to customize the user experience, and because the concept was simple, I've taken its concept and made kanaguessr! (although its name used to be KanaLearning)</p>
        <br/>
        <p>It helped friends with remembering katakanas, so I'm glad I took the time to make and polish this webpage!</p>
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center">
        <p>Still in early 2023, I've made <a href="https://github.com/TTTaevas/osu-api-v1-js" target="_blank">osu-api-v1-js</a>, my first JavaScript (TypeScript) package!</p>
        <br/>
        <p>I've been using the first version of osu!'s API in several ways for years at this point, and yet I've never been using any package to make my life easier, I remember simply using axios directly and copypasting code between some of my projects. I never felt like using third party software to use such a simple API.</p>
        <br/>
        <p>Yet it's not really great to keep writing the same code over and over again, so I used this excuse to finally try my hand at writing packages! I honestly think the result is great, it fully covers the API, is fully documented, and even makes things more intuitive and consistent, I literally don't know how I could make it better!</p>
      </div>
      <div className="border-4 p-4 m-4 max-w-3xl text-center">
        <a href="https://finder.taevas.xyz" target="_blank"><img className="m-4 float-right h-16" src="https://finder.taevas.xyz/Webpage/favicon.png" alt="Website-Finder logo"/></a>
        <p>...Website-Finder is actually an odd one. What started off in 2020 as <a href="https://gitlab.com/Isterix/rif2" target="_blank">a simple Ruby script that downloads images from <i>every website it can find</i></a>, became a way for me to experiment with different programming languages and their networking capabilities, without dependencies.</p>
        <br/>
        <p>I love the concept of a program finding 100% random websites in the wild for you, and that made me want to share the project with other people who would not really know how to run (or even choose!) any script, so in 2023, I redesigned the webpage version of the program, which is the only version with some sort of GUI.</p>
        <br/>
        <p>From what I remember, some people didn't actually like the design of the webpage, yet I think it's the best design I've ever managed to make for any website!</p>
        <br/>
        <p>I must have weird tastes or something.</p>
      </div>
    </div>
  )]
  return (
    <Tab tab={tab} setTab={setTab} id="projects" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M10 30H4a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2ZM4 16v12h6V16Z"/><path fill="#2e3436" d="M28 4H6a2 2 0 0 0-2 2v6h2V6h22v14H14v2h2v4h-2v2h9v-2h-5v-4h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/></svg>}/>
  )
}

export default Projects
