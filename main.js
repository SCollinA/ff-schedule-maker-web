const userOptions = document.getElementById('userOptions')
const createScheduleButton = document.querySelector('div.submitButton > button')
const scheduleResult = document.getElementById('scheduleResult')

createScheduleButton.addEventListener('click', event => {
    const numTeams = userOptions[0].value
    const numDivs = userOptions[1].value
    const numPlayoffTeams = userOptions[2].value
    const season = makeRandomSchedule(numTeams, numDivs, numPlayoffTeams)
    drawSchedule(season)
})

function drawSchedule(season) {
    const schedule = season[0]
    const numTeams = season[1].flatMap().length
    while (scheduleResult.childElementCount > 0) {
        scheduleResult.lastChild.remove()
    }
    // add appropriate elements to page
    for (let i = 0; i < schedule.length; i++) {
        const week = schedule[i]
        const weekResult = document.createElement('div')
        weekResult.classList.add('weekResult')
        for (let j = 0; j < (numTeams / 2); j++) {
            const gameResult = document.createElement('div')
            gameResult.classList.add('gameResult')
            gameResult.textContent = week[j]
            weekResult.appendChild(gameResult)
        }
        scheduleResult.appendChild(weekResult)
    }
}