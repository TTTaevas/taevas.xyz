import React from "react";

export default function Info({
	type,
	websites
}: {
	type: string,
	websites: {
		name: string,
		link: string,
		elements: React.JSX.Element[]
	}[]
}) {
	let sections = websites.map((w) => {
		return (
			<div id={w.name.toLowerCase().match(/[a-z]/g)!.join().replace(/,/g, "")}>
				<a href={w.link} target="_blank">
					<h2 className="uppercase text-right font-bold pr-1 bg-white text-red-500">
						{w.name}
					</h2>
				</a>
				<div className="info p-3 m-auto">
					{w.elements}
				</div>
			</div>
		)
	})

	return (
		<div className="m-5 flex w-80 border-l-3 border-r-3 border-b-3 border-white border-solid" id={type.toLowerCase()}>
			<h2 className="[text-orientation:upright] [writing-mode:vertical-rl]
			uppercase text-start text-2xl tracking-tighter font-bold pt-2
			border-r-3 border-t-3 border-white border-solid
			bg-sky-800">
				{type}
			</h2>
			<div className="w-80 bg-gradient-to-r from-sky-900 to-indigo-900">
				{sections}
			</div>
		</div>
	)
}
