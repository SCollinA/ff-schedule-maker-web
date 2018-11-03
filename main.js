const userOptions = document.getElementById('userOptions')
const createScheduleButton = document.querySelector('div.submitButton > button')
const scheduleResult = document.getElementById('scheduleResult')
let userSeason

createScheduleButton.addEventListener('click', event => {
    const numTeams = userOptions[0].value
    const numDivs = userOptions[1].value
    const numPlayoffTeams = userOptions[2].value
    userSeason = makeRandomSchedule(numTeams, numDivs, numPlayoffTeams)
    drawSchedule()
})

function drawSchedule() {
    const schedule = userSeason[0]
    const numTeams = userSeason[1].flatMap().length
    if (scheduleResult.childElementCount > 0) {
        scheduleResult.children.forEach(week => week.remove())
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