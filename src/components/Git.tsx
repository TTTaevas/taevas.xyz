import React, { useState, useEffect } from "react";
import Info from "./structures/info";

export type GithubInfo = {
	public: {
		repo: string
		date: string
	}
	private: {
		date: string
	}
} | undefined

export type GitlabInfo = {
	date: string
} | undefined

export default function Git() {
	const [github, setGithub]: [GithubInfo, React.Dispatch<React.SetStateAction<GithubInfo>>] = useState()
	const [gitlab, setGitlab]: [GitlabInfo, React.Dispatch<React.SetStateAction<GitlabInfo>>] = useState()

  const getGitlab = async () => {
    const response = await fetch("/.netlify/functions/gitlab").then(r => r.json())
    setGitlab(response)
  }

  const getGithub = async () => {
    const response = await fetch("/.netlify/functions/github").then(r => r.json())
    setGithub(response)
  }

  useEffect(() => {
		getGithub()
    getGitlab()
  }, [])

	if (github === undefined || gitlab === undefined) {
		return <></>
	}
	return (
		<Info
			type="Coding"
			websites={[{
				name: "GitHub",
				link: "https://app.hackthebox.com/profile/1063999",
				elements: [
					<p>Latest public push on GitHub: {github.public.date} on {github.public.repo}</p>,
					<p>Latest private push on GitHub: {github.private.date}</p>
				]
			},
			{
				name: "GitLab",
				link: "https://app.hackthebox.com/profile/1063999",
				elements: [
					<p>Latest push on GitLab: {gitlab.date}</p>
				]
			}]}
		/>
	)
}
