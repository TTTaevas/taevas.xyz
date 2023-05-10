import React, { useState, useEffect } from "react";

export type GitlabInfo = {
	date: string
} | undefined

export default function Gitlab() {
	const [gitlab, setGitlab]: [GitlabInfo, React.Dispatch<React.SetStateAction<GitlabInfo>>] = useState()
  const getGitlab = async () => {
    const response = await fetch("/.netlify/functions/gitlab").then(r => r.json())
    setGitlab(response)
  }

  useEffect(() => {
    getGitlab()
  }, [])

	if (gitlab === undefined) {
		return <></>
	}
	return (
		<div id="gitlab">
			<p>Meanwhile, my latest push on <strong>GitLab</strong> was on {gitlab.date}</p>
		</div>
	)
}
