// indicate here the list of all members in your group
const members = [
  "member 1",
  "member 2",
  "member 3",
  "member 4",
  "member 5",
  "member 6",
  "member 7",
  "member 8",
  "member 9",
]

// enter all combinations of groups that have been created to date
// Note: this will be used to count how many times people worked together
// and, when generating groups, diversify groups based of this data
const pastGroups = {
  0: [
    "member 1",
    "member 8",
    "member 6",
    "member 2",
  ],
  1: [
    "member 3",
    "member 5",
    "member 4",
    "member 9",
    "member 7",
  ],
  2: [
    "member 6",
    "member 4",
    "member 2",
    "member 1",
  ],
}

module.exports = {members, pastGroups}
