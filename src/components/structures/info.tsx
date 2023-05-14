import React from "react";

export default function Info({
	title,
	link,
	description,
	elements,
}: {
	title: string,
	link: string,
	description: string
	elements: React.JSX.Element[]
}) {
	return (
		<div 
			id={title.toLowerCase().match(/[a-z]/g)!.join().replace(/,/g, "")}
			className="border-3 border-solid border-white m-5 w-80"
		>
			<a href={link} target="_blank">
				<h2 className="info_title">{title}</h2>
			</a>
			<div className="flex">
				<h2 className="info_description">{description}</h2>
				<div className="info py-5 px-2.5 m-auto">
					{elements}
				</div>
			</div>
		</div>
	)
}
