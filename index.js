//Max number of members per group that previously worked together
const MAX_SAME_MEMBERS = 2

function randomIntWithin(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// randomly divide in groups
function randomlyGroup(array, numberOfGroups, referenceGroup){
  let groups = {}

  // Prevents having groups with too many people who previously worked together
  const isSimilarToRef = (group) => {
    const intersectionWithRef = ref => group.filter(member => ref.includes(member))
    const hasTooManySameMembers = ([_, ref]) => intersectionWithRef(ref).length > MAX_SAME_MEMBERS
    const getSimilarityWithReference = Object.entries(referenceGroup).map(hasTooManySameMembers)
    const isSimilar = getSimilarityWithReference.reduce((acc, val) => acc || val, false)
    return isSimilar
  }

  return array.reduce((result, el, index) => {
    let rand
    let randCounts = 0

    const isGroupFull = (n, index) => {
      const groupSize = result[n]?.length
      // maxEvenDistribution: The maximum number X so that every group has at least X members
      const maxEvenDistribution = Math.floor(array.length / numberOfGroups)
      // hasMaxEvenDistribution: true if the size of all groups already reached maxEvenDistribution
      const hasMaxEvenDistribution = index >= (array.length - (array.length % numberOfGroups))
      // set groupMaxSize to maxEvenDistribution + 1 for when we cannot have equally sized groups
      const groupMaxSize = hasMaxEvenDistribution ? maxEvenDistribution + 1 : maxEvenDistribution
      // group is full if it reached dynamically generated max size
      return groupSize === groupMaxSize
    }

    do {
      rand = randomIntWithin(0, numberOfGroups - 1)
      var newGroup = [...(result[rand]||[]), el]
      randCounts++
      if(randCounts > 500) throw new Error("There's an infinite loop")
    }
    // pick another group if the group reached max size...
    // ...or if it contains too many of the same people as the reference group
    while(isGroupFull(rand, index) || isSimilarToRef(newGroup))

    // merge the new group attribution with previously-reduced group attributions
    return ({...result, [rand]: newGroup})
  }, groups)
}

module.exports = randomlyGroup
