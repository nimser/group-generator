const {members} = require("./data")
const {randomIntWithin} = require("./lib/utils/")

const index = randomIntWithin(0,members.length)
console.log(members[index])


