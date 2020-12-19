const micro = require("micro")
const bent = require("bent")
const query = require("micro-query")
// const qs = require("qs")

const getJSON = bent("json")

module.exports = async (req, res) => {
	const { q = "" } = query(req)
	console.log({ q })
	// TODO support more than 250 matching entries
	// https://api-docs.npms.io/#api-Search-ExecuteSearchQuery
	let { results: packages } = await getJSON(
		`https://api.npms.io/v2/search?q=${q.replace(
			/[^a-zA-Z0-9 \-_]/g,
			""
		)} keywords:udt-plugin&size=250`
	)

	packages = packages.filter((p) => {
		if (!p.package.name.startsWith("udt-")) return false
		return true
	})

	micro.send(
		res,
		200,
		packages.map((p) => ({
			...p.package,
			popularity: p.score.detail.popularity,
		}))
	)
}
