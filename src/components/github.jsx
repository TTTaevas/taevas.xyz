import { useState, useEffect } from "react";

export default function Github() {
	const [github, setGithub] = useState({})
  const getGithub = async () => {
    const response = await fetch("/.netlify/functions/github").then(r => r.json())
    setGithub(response)
  }

  useEffect(() => {
    getGithub()
  }, [])

	if (github.public === undefined || github.public.date === undefined) {
		return <></>
	}
	return (
		<div id="github">
			<p>My latest <strong>public</strong> push was to the <a href={`https://github.com/${github.public.repo}`}>{github.public.repo}</a> repo on {github.public.date}</p>
			<p>My latest <strong>private</strong> push was done on {github.private.date}</p>
		</div>
	)
}
