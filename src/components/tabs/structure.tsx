import React from "react";
import AnimateHeight from "react-animate-height";

export default function Tab({
	tab,
	name,
	elements,
	image
}: {
	tab: string,
	name: string,
	elements: React.JSX.Element[],
	image?: React.JSX.Element
}) {
	return (
		<AnimateHeight
      id={name}
      duration={300}
      height={tab === name ? "auto" : 0}
    >
			<div className="relative bg-white mb-2 md:rounded-t-xl">
				{image ? <div className="absolute w-0 md:w-12 h-12 inset-x-1/2 ml-[-24px]">{image}</div> : ""}
				<h3 className="text-5xl text-right pr-2">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
			</div>
      {elements}
    </AnimateHeight>
	)
}
