function randomIntWithin(min, max){
  return Math.floor(Math.random() * (max-min+1) + min)
}

// randomly divide in groups
function randomlyGroup(array, numberOfGroups){
  let groups = {}
  return array.reduce((result, el, index) => {
    let rand;
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
    }
    // pick another group if the group reached max size
    while(isGroupFull(rand, index))

    // merge the new group attribution with previously-reduced group attributions
    return ({...result, [rand]: [...(result[rand] || []), el]})
  }, groups)
}

module.exports = randomlyGroup
