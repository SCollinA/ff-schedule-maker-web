let allGames

function makeRandomSchedule(numTeams, numDivs, numPlayoffWeeks) {
    let schedule = []
    const numRegWeeks = 16 - numPlayoffWeeks
    const gamesPerWeek = numTeams / 2

    // const teamsPerDiv = numTeams / numDivs
    const teams = createTeamsArray(numTeams)
    const divisions = createDivsArray(numDivs)
    const league = createLeague(teams.slice(0), divisions)

    allGames = findAllGames(teams)
    // pick a random game from all games
    // check game
    // add game, pick another random game
    // if no games available (ie in all games but not scheduled or checked)
    // remove game
    
    
    return schedule
}

function addGame(schedule, league, ) {
    let checkedGames = []
    let scheduledGames = [] 
}

function findAllGames(teams) {
    let gamesArray = []
    teams.forEach((team1, index, teams) => {
        teams.forEach(team2 => {
            if (team1 != team2) {
                gamesArray.push([team1, team2])
            }
        })
    })
    console.log(gamesArray)
    return gamesArray
}

function createTeamsArray(numTeams) {
    let teamsArray = []
    // create array of teams
    for (let i = 0; i < numTeams; i++) {
        teamsArray.push(`Team${i + 1}`)
    }
    return teamsArray
}

function createDivsArray(numDivs) {
    let divsArray = []
    // create array of teams
    for (let i = 0; i < numDivs; i++) {
        divsArray.push([])
    }
    return divsArray
}

function createLeague(teams, divisions) {
    const teamsPerDiv = teams.length / divisions.length
    // assign all teams a division
    while (teams.length > 0) {
        for (let i = 0; i < divisions.length; i++) {
            if (divisions[i].length < teamsPerDiv) {
                divisions[i].push(teams.shift())
            }
        }
    }
    // league is an array of divisions, which are arrays of teams
    return divisions
}
