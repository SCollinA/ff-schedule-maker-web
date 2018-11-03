const submitButton = document.querySelector('div.submitButton > button')
const userOptions = document.getElementById('userOptions')
const scheduleResult = document.getElementById('scheduleResult')

userOptions.onsubmit = event => {
    const numTeams = event.target.elements.numTeams.value
    const numDivs = event.target.elements.numDivs.value
    const numPlayoffTeams = event.target.elements.numPlayoffTeams.value
    const schedule = makeRandomSchedule(numTeams, numDivs, numPlayoffTeams)
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
    const randH3 = document.createElement('h3')
    randH3.textContent = 'hello'
    scheduleResult.appendChild(randH3)
}