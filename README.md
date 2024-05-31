## FEATURES

- generate a given amount of groups randomly from an array of names
- pass history of past groups to maximize diversity when generating new groups (avoid putting together people who previously worked together)
- for any member of your group, show the list of who they previously worked with and how many times


## USAGE

### Customize your data

`cp data.sample.js data.js`

### Run the group generator

`node generateGroups.js`

### Show history of who worked together

`node showPreviousMatches.js`
