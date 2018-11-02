const submitButton = document.querySelector('div.submitButton > button')
const userOptions = document.getElementById('userOptions')
userOptions.onsubmit = event => {
    const numTeams = event.target.elements.numTeams.value
    const numDivs = event.target.elements.numDivs.value
    const numPlayoffTeams = event.target.elements.numPlayoffTeams.value
    makeRandomSchedule(numTeams, numDivs, numPlayoffTeams)
}

// function testArrays() {
//     const array1 = [['h', 'g'],['f', 'e'],['d','i'],['c','b']]
//     const array2 = ['h', 'g']
//     return array1.includes(array2)
// }