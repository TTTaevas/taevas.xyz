import React from "react";
import AnimateHeight from "react-animate-height";

export default function Tab({
	tab,
	name,
	elements
}: {
	tab: string,
	name: string,
	elements: React.JSX.Element[]
}) {
	return (
		<AnimateHeight
      id={name}
      duration={300}
      height={tab === name ? "auto" : 0}
    >
      <h3 className="text-5xl text-right bg-white pr-2 mb-2 rounded-t-xl">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      {elements}
    </AnimateHeight>
	)
}
