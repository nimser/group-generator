const {members, pastGroups} = require("./data.js")
const getPreviousMatches = require("./lib/getPreviousMatches.js")

const output = getPreviousMatches(members, pastGroups)
console.log(JSON.stringify(output, null, 4))
