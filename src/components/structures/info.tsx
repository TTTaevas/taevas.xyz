import React from "react";

export default function Info({
	title,
	description,
	elements,
}: {
	title: string,
	description: string
	elements: React.JSX.Element[]
}) {
	return (
		<div id={title.toLowerCase()}>
			<h2 className="info_title">{title}</h2>
			<div className="info_details">
				<h2 className="info_description">{description}</h2>
				<div className="info">
					{elements}
				</div>
			</div>
		</div>
	)
}
