//Max number of members per group that previously worked together
const MAX_SAME_MEMBERS = 2

function randomIntWithin(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// randomly divide in groups
function randomlyGroup(members, numberOfGroups, referenceGroup){

  // Prevents having groups with too many people who previously worked together
  const isSimilarToRef = (group) => {
    const intersectionWithRef = ref => group.filter(member => ref.includes(member))
    const hasTooManySameMembers = ([_, ref]) => intersectionWithRef(ref).length > MAX_SAME_MEMBERS
    const getSimilarityWithReference = Object.entries(referenceGroup).map(hasTooManySameMembers)
    const isSimilar = getSimilarityWithReference.reduce((acc, val) => acc || val, false)
    return isSimilar
  }

  return members.reduce((partialGroups, participant, index) => {
    let rand
    let randCounts = 0

    const isGroupFull = (n, index) => {
      const groupSize = partialGroups[n]?.length
      // maxEvenDistribution: The maximum number X so that every group has at least X members
      const maxEvenDistribution = Math.floor(members.length / numberOfGroups)
      // hasMaxEvenDistribution: true if the size of all groups already reached maxEvenDistribution
      const hasMaxEvenDistribution = index >= (members.length - (members.length % numberOfGroups))
      // set groupMaxSize to maxEvenDistribution + 1 for when we cannot have equally sized groups
      const groupMaxSize = hasMaxEvenDistribution ? maxEvenDistribution + 1 : maxEvenDistribution
      // group is full if it reached dynamically generated max size
      return groupSize === groupMaxSize
    }

    // Add participant to any of the partial groups.
    // THEN if that HAS reached max size or contain too many of the same people as the reference group...
    // ...reattempt the logic, assigning the participant to another group
    do {
      rand = randomIntWithin(0, numberOfGroups - 1)
      // Add current person to a random group
      var newGroup = [...(partialGroups[rand]||[]), participant]
      randCounts++
      // We sometimes end up with a partial generation that can't be finished
      if(randCounts > 500) throw new Error("Attempted combination won't work. Aborting.")
    }
    while(isGroupFull(rand, index) || isSimilarToRef(newGroup))

    // merge the new group attribution with previously-reduced group attributions
    return ({...partialGroups, [rand]: newGroup})
  }, {})
}

module.exports = randomlyGroup
