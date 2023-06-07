import React from "react";
import Tab from "./structure";

function About({
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
			en: "about",
			fr: "à propos"
		}
	}
	let elements = [(
		<div className="m-4 text-white">
			<div className="ml-auto max-w-3xl text-center">
				<img className="m-4 float-right h-32" src="/brittany.jpg" alt="Flag of Brittany"/>
				<p>o/ <b>I'm Taevas</b> (rough IPA: /taɛvæs/) and I am a young person from <b>Brittany</b> who is heavily invested in everything networking-related, 
					such as but not limited to <b>web development, cybersecurity, and cryptography.</b></p>
					<br/>
				<p>I am also somewhat skilled in more common stuff, such as <b>spreadsheeting, video-editing, and even specific video games</b>, so far as to 
					speedrun them or to play them competitively!
				</p>
				<br/>
				<p>In the recent past, I have organized, helped with organizing, and played in many tournaments on osu!, a popular rhythm game.</p>
			</div>
			<div className="mr-auto mt-4 max-w-3xl text-center">
				<a href="https://www.pixiv.net/en/artworks/85330094" target="_blank">
					<img className="m-4 float-left h-32 w-32" src="/lain.png" alt="Picture of Lain"/>
				</a>
				<p>I really like Japanese media! Often if not always, I'll choose to have a drawing of <b>Lain Iwakura from Serial Experiments Lain</b>, a piece of media I
					deeply enjoy, as my profile picture on the various websites I have an account on.</p>
				<br/>
				<p>If you're on a large screen, you can find out <b>my latest activities on the web on the right side of the screen on this website</b>, including a tracker for
					the music I listen to and the animes I watch. I haven't found a cool tracker for western media yet, let me know if you know any!</p>
				<br/>
				<p>If you have any question you would like to ask me, don't hesitate to contact me!</p>
			</div>
    </div>
	)]
	return (
    <Tab tab={tab} setTab={setTab} id="about" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"/></svg>}/>
	)
}

export default About
