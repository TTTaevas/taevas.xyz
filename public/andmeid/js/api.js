opened_requests = []

function api(type, id, config) {
	if (!id) return console.error(`No valid ID is provided: ${id}`)
	if (isNaN(id)) return console.error(`The ID is invalid: ${id}`)
	if (opened_requests.indexOf(id) > -1) return null

	let xhr = new XMLHttpRequest()
	xhr.open("POST", `/andmeid/${type}`)
	opened_requests.push(id)

	xhr.setRequestHeader("Accept", "application/json")
	xhr.setRequestHeader("Content-Type", "application/json")

	if (config) {
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) return
			opened_requests.splice(opened_requests.indexOf(id), 1)
			display(type[0], JSON.parse(xhr.response).content, config)
		}
	}

	xhr.send(`{"id": ${id}}`)
}

function replaceWithData(type, host) {
	let children = Array.from(host.children)
	let maidens = children.filter((c) => c.getAttribute("osu_id"))

	maidens.forEach((m) => {
		let id = m.getAttribute("osu_id")
		let size = m.getAttribute("size") || "r"
		api(type, id, {size, replace: host.querySelector(`div[osu_id="${id}"]`)})
	})
}

function display(type, d, c) {
	if (!c) {c = {}}

	var element
	if (d === false) { // don't do (!d), id 0 is a thing, especially for deleted beatmaps
		element = document.createElement("p")
		element.classList.add("unsuccessful")
		element.innerHTML = "The requested data does not seem to exist ><"
	} else {
		if (type == "u") {element = c.size == "f" ? u_full(d) : c.size == "s" ? u_small(d) : u_required(d)}
		else if (type == "m") {element = c.size == "f" ? m_full(d) : c.size == "s" ? m_small(d) : m_required(d)}
		else if (type == "b") {element = c.size == "f" ? b_full(d) : c.size == "s" ? b_small(d) : b_required(d)}
		else if (type == "g") {element = c.size == "f" ? g_full(d) : c.size == "s" ? g_small(d) : g_required(d)}
		else if (type == "s") {element = c.size == "f" ? s_full(d) : c.size == "s" ? s_small(d) : s_required(d)}
		else { // Unless the user forces through console, type shouldn't ever be something else
			element = document.createElement("p")
			element.classList.add("unsuccessful")
			element.innerHTML = "Some weird bug happened, sorry... ><'"
		}
	}

	if (c.return) return element
	if (c.replace) {
		let hide_button = c.replace.parentNode.getElementsByClassName("hide") // make element invisible if hide button is unavailable
		if (hide_button[0] && hide_button[0].classList.contains("invisible")) element.classList.add("invisible")
		return c.replace.parentNode.replaceChild(element, c.replace)
	}
	if (c.host) return c.host.appendChild(element)
}
