Array.prototype.flatMap = function(selector){
    let newArray = []
    this.forEach(item => {
        item.forEach(childItem => {
            newArray.push(childItem)
        })
    })
    return newArray
}

function makeRandomSchedule(numTeams, numDivs, numPlayoffWeeks) {
    console.log('Making schedule...')
    // debugger
    let schedule = []
    const numRegWeeks = 16 - numPlayoffWeeks
    const teams = createTeamsArray(numTeams)
    const divisions = createDivsArray(numDivs)
    const league = createLeague(teams, divisions)
    // add weeks to schedule
    for (let i = 0; i < numRegWeeks; i++) {
        schedule.push([])
        // // add games to schedule
        // for (let j = 0; j < teams.length / 2; j++) {
        //     schedule[i].push([])
        // }
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
        console.log('Filtering possible game...')
        // debugger
        if (!scheduledGames.includes(game)) {
            return true
        }
        return false
    })
    schedule.forEach(week => {
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
            const randomGame = allGames[Math.floor(Math.random() * allGames.length)]
            // debugger
            // check game
            // take it out of possible games
            allGames.splice(allGames.indexOf(randomGame), 1)
            if (checkGame(randomGame, season) && checkTeams(randomGame, week)) {
                console.log('Good game found, adding game...')
                // debugger
                week.push(randomGame)
                // if you cannot find a good path after this add
                if (!addGame(season)) {
                    console.log('Removing last game...')
                    // debugger
                    // undo it and try again
                    week.pop(randomGame)
                }
            }
        }
    })
    // if schedule is complete return schedule
    // else return false
    console.log('Schedule complete!')
    console.log(schedule)
    // debugger
    return schedule
}

function findAllGames(teams) {
    console.log('Getting possible games...')
    let gamesArray = []
    teams.forEach((team1, index, teams) => {
        teams.forEach(team2 => {
            if (team1 != team2) {
                gamesArray.push([team1, team2])
            }
        })
    })
    return gamesArray
}

function checkTeams(randomGame, week) {
    console.log('Checking teams...')
    // debugger
    const homeTeam = randomGame[0]
    const awayTeam = randomGame[1]
    for (let i = 0; i < week.length; i++) {
        if (week[i].includes(homeTeam) || week[i].includes(awayTeam)) {
            return false
        }
    }
    // teams have not played yet
    return true
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
        if ((nonDivCount(homeTeam, scheduledGames) < maxNonDivGames)  && 
        (nonDivCount(awayTeam, scheduledGames) < maxNonDivGames)) {
            // and teams have not playe max home games
            if ((homeCount(homeTeam, scheduledGames) < maxHomeGames) && 
            (homeCount(awayTeam, scheduledGames) < maxHomeGames)) {
                return true
            }
        }
    }
    // }
    return false
}

function isDivisional(game, league) {
    console.log('Checking divisional...')
    // debugger
    for (let i = 0; i < league.length; i++) {
        if (league[i].includes(game[0]) && league[i].includes(game[0])) {
            return true
        }
    }
    return false
}

function nonDivCount(team, scheduledGames) {
    let count = 0
    scheduledGames.forEach(game => {
        if (game.includes(team)) {
            count++
        }
    })
    return count
}

function homeCount(team, scheduledGames) {
    let count = 0
    scheduledGames.forEach(game => {
        if (game.includes(team)) {
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
