const randomlyGroup = require("./lib/randomlyGroup.js")
const {members, pastGroups} = require("./data.js")

let query
const generateGroups = () =>{
  try {
    query = randomlyGroup(members, 3, pastGroups)
  } catch(e) {
    console.error(`${e.name}: ${e.message}`)
    console.error("Re-attempting...")
    generateGroups() 
  }
}
generateGroups()
console.info(query)
