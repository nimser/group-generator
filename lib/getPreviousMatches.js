const wasAmongGroup = (group, participant) =>
  group.includes(participant)

// looks at past groups a given participant took part in to summarize people they worked with 
function participantHistoryReducer(participant){
  return (dedupedHistory, group) => {
    return {
      ...dedupedHistory, 
      ...(
        wasAmongGroup(group, participant)
          ? (() => {
            const groupWithoutParticipant = group.filter(m => m !== participant)
            return Object.fromEntries(groupWithoutParticipant.map(p => [p, (dedupedHistory[p] + 1 || 1)]))
          })()  
          : {}
      )
    }

  }
}

// get each group member alongside the people they've worked with before, indiquating how many times
function getPreviousMatches(crew, pastGroups){
  return crew.reduce(
    (matches, participant) => ({
      ...matches, 
      [participant]: Object.values(pastGroups).reduce(participantHistoryReducer(participant), {})
    }),
    {}
  )
}
module.exports = getPreviousMatches 
