const v1 = require("../../apis/osu-v1.js")
const v2 = require("../../apis/osu-v2.js")

exports.main = async (req, res) => {
	let playlists = await req.layer01.db.collection("playlists").find().toArray()
	res.status(200).render("layer01/playlists", {user: req.auth.user, roles: req.roles, playlists})
}

exports.create = async (req, res) => {
	let creation = await createPlaylist(req.layer01.db, req.body)
	console.log(`Playlist creation: ${creation.message}`)
	res.redirect("/layer01/playlists")
}

async function createPlaylist(db, form) {
	let maps = form.c_mod.map((a, index) => {return {mod_id: form.c_mod[index], mod: form.c_mod[index].substring(0, 2), id: form.c_id[index]}})
	let token = await v2.getToken()

	for (let i = 0; i < maps.length; i++) {
		let map_data = await v2.getBeatmap(token, maps[i].id)
		if (map_data) {
			let map_v1 = false
			switch(maps[i].mod) {
				case "HR":
					map_v1 = await v1.getBeatmap(maps[i].id, 16)
					map_data.cs = map_data.cs * 1.3 > 10 ? 10 : Number((map_data.cs * 1.3).toFixed(1))
					map_data.ar = map_data.ar * 1.4 > 10 ? 10 : Number((map_data.ar * 1.4).toFixed(1))
					map_data.accuracy = map_data.accuracy * 1.4 > 10 ? 10 : Number((map_data.accuracy * 1.4).toFixed(1))
					break
				case "DT":
					map_v1 = await v1.getBeatmap(maps[i].id, 64)
					map_data.bpm = Math.round(map_data.bpm * 1.5)
					map_data.ar = Number((map_data.ar <= 5 ? (1800-((1800-map_data.ar*120)*2/3))/120 : ((1200-((1200-(map_data.ar-5)*150)*2/3))/150)+5).toFixed(1))
					map_data.accuracy = Number(((79.5-((79.5-6*map_data.accuracy)*2/3))/6).toFixed(1))
					map_data.total_length = Math.round(map_data.total_length / (3 / 2)) // Total length is currently unused by website but au-cas-où
					map_data.hit_length = Math.round(map_data.hit_length / (3 / 2))
					break
				case "EZ":
					map_v1 = await v1.getBeatmap(maps[i].id, 2)
					map_data.cs = map_data.cs / 2
					map_data.ar = map_data.ar / 2
					map_data.accuracy = map_data.accuracy / 2
					break
			}
			if (map_v1) {map_data.difficulty_rating = Number(Number(map_v1[0].difficultyrating).toFixed(2))}
			map_data.total_length = new Date(map_data.total_length * 1000).toISOString().substr(14, 5) // Total length is currently unused by website but au-cas-où
			map_data.hit_length = new Date(map_data.hit_length * 1000).toISOString().substr(14, 5)
			maps[i].data = map_data
		} else {
			return {ok: false, message: "Something went wrong while requesting a map"}
		}
	}

	let pool = {
		name: form.c_name,
		mappack: form.c_mappack,
		maps: maps
	}

	let collection = db.collection("playlists")
	let insertion = await collection.insertOne(pool)
	let end_message = insertion.insertedId ? "created!" : "insertion failed"
	return {ok: true, message: `${form.c_name} ${end_message}`}
}
