import { useState, useEffect } from "react";

export default function Gitlab() {
	const [gitlab, setGitlab] = useState({})
  const getGitlab = async () => {
    const response = await fetch("/.netlify/functions/gitlab").then(r => r.json())
    setGitlab(response)
  }

  useEffect(() => {
    getGitlab()
  }, [])

	if (gitlab.date === undefined) {
		return <></>
	}
	return (
		<div id="gitlab">
			<p>Meanwhile, my latest push on <strong>GitLab</strong> was on {gitlab.date}</p>
		</div>
	)
}
