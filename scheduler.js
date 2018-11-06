// if the length of all games equals the length of the remaining games for a week
// then if any of the games doesn't work, this is a bad path

Array.prototype.flatMap = function(selector){
    let newArray = []
    this.forEach(item => {
        item.forEach(childItem => {
            newArray.push(childItem)
        })
    })
    return newArray
}

function makeRandomSchedule(numTeams, numDivs, numPlayoffTeams) {
    console.log('Making schedule...')
    // debugger
    // remove previous schedule, if any
    // debugger
    let schedule = []
    const numRegWeeks = 16 - numPlayoffWeeks(numPlayoffTeams)
    const teams = createTeamsArray(numTeams)
    const divisions = createDivsArray(numDivs)
    const league = createLeague(teams, divisions)
    // add weeks to schedule
    for (let i = 0; i < numRegWeeks; i++) {
        schedule.push([])
    }
    const season = [schedule, league]
    console.log('Adding first game...')
    // debugger
    return addGame(season)
}

function addGame(season) {
    console.log('Adding next game...')
    // debugger
    const league = season[1]
    const teams = season[1].flatMap()
    const gamesPerWeek = teams.length / 2
    let schedule = season[0]
    let scheduledGames = schedule.flatMap()
    const allGames = findAllGames(teams).filter(game => {
        // console.log('Filtering possible game...')
        // if the game is already scheduled
        if (hasGame(game, scheduledGames)) {
            // console.log(game)
            return false
        }
        return true
    })
    // debugger
    for (let i = 0; i < schedule.length; i++) {
        const week = schedule[i]
        while (week.length < gamesPerWeek) {
            // pick a random game from all games
            // if no games available (ie in all games but not scheduled or checked)
            if (allGames.length == 0) {
                console.log('Bad schedule found. Returning...')
                // debugger
                // remove game
                return false
            }
            console.log('Generating random game')
            let randomGame = allGames[Math.floor(Math.random() * allGames.length)]
            if (week.length == gamesPerWeek - 1) {
                console.log('Week almost full...')
                // debugger
                randomGame = lastGameOfWeek(week, season)
                // make that last game
                // if that game is not in all games
                if (!hasGame(randomGame, allGames)) {
                    // debugger
                    // make it a different one
                    randomGame = [randomGame[1], randomGame[0]]
                    // if that game is not in all games
                    if (!hasGame(randomGame, allGames)) {
                        // debugger
                        // this is a bad path
                        return false
                    }
                }
            }
            // debugger
            // check game
            // take it out of possible games
            allGames.splice(indexOfGame(randomGame, allGames), 1)
            if (checkGame(randomGame, season) && checkTeams(randomGame, week)) {
                console.log('Good game found, adding game...')
                // if (i == 13) { debugger }
                // debugger
                week.push(randomGame)
                // debugger
                // if you cannot find a good path after this add
                if (!addGame(season)) {
                    console.log('Removing last game...')
                    // debugger
                    // undo it and try again
                    week.pop(randomGame)
                    // debugger
                }
            }
        }
    }
    // if schedule is complete return schedule
    // else return false
    console.log('Schedule complete!')
    console.log(schedule)
    // debugger
    return season
}

function findAllGames(teams) {
    console.log('Getting possible games...')
    let gamesArray = []
    teams.forEach(team1 => {
        teams.forEach(team2 => {
            if (team1 != team2) {
                gamesArray.push([team1, team2])
            }
        })
    })
    return gamesArray
}

function lastGameOfWeek(week, season) {
    console.log('Finding last game of week...')
    // debugger
    const league = season[1]
    const teams = league.flatMap()
    for (let i = 0; i < week.length; i++) {
        const game = week[i]
        teams.splice(teams.indexOf(game[0]), 1)
        teams.splice(teams.indexOf(game[1]), 1)
    }
    return [teams[0], teams[1]]
}

function checkTeams(randomGame, week) {
    console.log('Checking teams...')
    // debugger
    const homeTeam = randomGame[0]
    const awayTeam = randomGame[1]
    for (let i = 0; i < week.length; i++) {
        if (week[i].includes(homeTeam) || week[i].includes(awayTeam)) {
            console.log('Teams already playing...')
            return false
        }
    }
    // teams have not played yet
    return true
}

function hasGame(game, gamesArray) {
    // if game array contains game
    // return index of game in games array
    // else return false
    if (indexOfGame(game, gamesArray) >= 0) {
        return true
    }
    return false
}

function indexOfGame(game, gamesArray) {
    for (let i = 0; i < gamesArray.length; i++) {
        // if home team == home team and
        // away team == away team, same game
        if (game[0] == gamesArray[i][0] &&
            game[1] == gamesArray[i][1]) {
                return i
        }
    }
    // index not found
    return -1
}

function checkGame(randomGame, season) {
    console.log('Checking game...')
    // debugger
    // play everyone in div twice
    // play everyone else once
    const homeTeam = randomGame[0]
    const awayTeam = randomGame[1]
    const schedule = season[0]
    const league = season[1]
    const division1 = league[0]
    const divGames = (division1.length - 1) * 2
    const maxNonDivGames = schedule.length - divGames
    const maxHomeGames = Math.ceil(season[0].length / 2)
    const scheduledGames = season[0].flatMap()
    // if (!scheduledGames.includes(randomGame)) {
    // game is divisional
    if (isDivisional(randomGame, league)) {
        return true
    // if game is not divisional
    } else {
        // if teams have not played maximum non divisional games
        if ((nonDivCount(homeTeam, season) < maxNonDivGames)  && 
        (nonDivCount(awayTeam, season) < maxNonDivGames)) {
            // and teams have not playe max home games
            if ((homeCount(homeTeam, season) < maxHomeGames) && 
            (homeCount(awayTeam, season) < maxHomeGames)) {
                return true
            }
        }
    }
    console.log('Game not approved...')
    return false
}

function isDivisional(game, league) {
    // console.log('Checking divisional...')
    // debugger
    const homeTeam = game[0]
    const awayTeam = game[1]
    for (let i = 0; i < league.length; i++) {
        const division = league[i]
        if (division.includes(homeTeam) && division.includes(awayTeam)) {
            return true
        }
    }
    return false
}

function nonDivCount(team, season) {
    // just returns number of games team is in
    // debugger
    const scheduledGames = season[0].flatMap()
    let count = 0
    scheduledGames.forEach(game => {
        if (game.includes(team) && !isDivisional(game, season[1])) {
            count++
        }
    })
    return count
}

function homeCount(team, scheduledGames) {
    // this is not working
    // debugger
    let count = 0
    scheduledGames.forEach(game => {
        if (game.includes(team) && game[0] == team) {
            count++
        }
    })
    return count
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

function numPlayoffWeeks(numTeams) {
    let numWeeks = 0
    while (numTeams > 1) {
        numTeams /= 2
        numWeeks += 1
    }
    return numWeeks
}
