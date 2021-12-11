
//HTML Elements
const matchupArea = document.getElementById('matchup-area')
const addMatchupButton = document.getElementById('add-matchup-button')
const calculateBetsButton = document.getElementById('calculate-bets-button')

const betsArea = document.getElementById('bets-area')


//Global Variables
var matchupDict = {}
var betTypeDict = {}


//Window Onload Function
window.onload = () => {
    loadMyBookieCalculator()
}

function loadMyBookieCalculator() {
    while(matchupArea.firstChild) {
        matchupArea.removeChild(matchupArea.firstChild)
    }

    while (betsArea.firstChild) {
        betsArea.removeChild(betsArea.firstChild)
    }

    addMatchupButton.addEventListener('click', () => {
        addMatchup()
    })

    calculateBetsButton.addEventListener('click', () => {
        calculateBets()
    })

    addMatchup()
}



function addMatchup(){


    var matchupIndex = Object.keys(matchupDict).length
    var matchupText = `Matchup ${matchupIndex + 1}`
    matchupDict[matchupIndex] = {}

    const teamBlock = createDOMElement('div', 'team-block', 'none', matchupArea)
    const teamForm = createDOMElement('form', 'team-form w-form', 'none', teamBlock )
    const teamFieldsDiv = createDOMElement('form', 'team-fields-div w-form', 'none', teamForm )

    const teamNameFields = createDOMElement('div', 'team-name-fields', 'none', teamFieldsDiv)
    const matchupHeader = createDOMElement('div', 'matchup-header', 'none', teamNameFields)
    createDOMElement('div', 'matchup-text', `${matchupText}`, matchupHeader)

    const team1FieldDiv = createDOMElement('div', 'field-div', 'none', teamNameFields)
    const team1Field = createDOMElement('input', 'name-field w-input', 'none', team1FieldDiv)
    team1Field.setAttribute('id', `team-field-1-${matchupIndex}`)
    team1Field.placeholder = 'Team 1'

    const team2FieldDiv = createDOMElement('div', 'field-div', 'none', teamNameFields)
    const team2Field = createDOMElement('input', 'name-field w-input', 'none', team2FieldDiv)
    team2Field.setAttribute('id', `team-field-2-${matchupIndex}`)
    team2Field.placeholder = 'Team 2'

    const oddsFieldsDiv = createDOMElement('div', 'odds-fields-div', 'none', teamFieldsDiv)

    const spreadOddsDiv = createDOMElement('div', 'odds-div', 'none', oddsFieldsDiv)
    spreadOddsDiv.setAttribute('id', `spread-div-${matchupIndex}`)
    spreadOddsDiv.addEventListener('click', () => {
        betTypeDict[matchupIndex] = 'spread'
        document.getElementById(`spread-div-${matchupIndex}`).className = 'odds-div-selected'
        document.getElementById(`moneyline-div-${matchupIndex}`).className = 'odds-div'
        document.getElementById(`total-div-${matchupIndex}`).className = 'odds-div'
    })
    const spreadOddsHeaderDiv = createDOMElement('div', 'odds-header', 'none', spreadOddsDiv)
    createDOMElement('div', 'matchup-text', 'SPREAD', spreadOddsHeaderDiv)
    const spread1Field = createDOMElement('input', 'odds-field w-input', 'none', spreadOddsDiv)
    spread1Field.setAttribute('id', `spread-field-1-${matchupIndex}`)
    spread1Field.placeholder = 'Enter Odds'
    const spread2Field = createDOMElement('input', 'odds-field w-input', 'none', spreadOddsDiv)
    spread2Field.setAttribute('id', `spread-field-2-${matchupIndex}`)
    spread2Field.placeholder = 'Enter Odds'

    const moneylineOddsDiv = createDOMElement('div', 'odds-div', 'none', oddsFieldsDiv)
    moneylineOddsDiv.setAttribute('id', `moneyline-div-${matchupIndex}`)
    moneylineOddsDiv.addEventListener('click', () => {
        betTypeDict[matchupIndex] = 'moneyline'
        document.getElementById(`spread-div-${matchupIndex}`).className = 'odds-div'
        document.getElementById(`moneyline-div-${matchupIndex}`).className = 'odds-div-selected'
        document.getElementById(`total-div-${matchupIndex}`).className = 'odds-div'
    })
    const moneylineOddsHeaderDiv = createDOMElement('div', 'odds-header', 'none', moneylineOddsDiv)
    createDOMElement('div', 'matchup-text', 'MONEYLINE', moneylineOddsHeaderDiv)
    const moneyline1Field = createDOMElement('input', 'odds-field w-input', 'none', moneylineOddsDiv)
    moneyline1Field.setAttribute('id', `moneyline-field-1-${matchupIndex}`)
    moneyline1Field.placeholder = 'Enter Odds'
    const moneyline2Field = createDOMElement('input', 'odds-field w-input', 'none', moneylineOddsDiv)
    moneyline2Field.setAttribute('id', `moneyline-field-2-${matchupIndex}`)
    moneyline2Field.placeholder = 'Enter Odds'


    const totalOddsDiv = createDOMElement('div', 'odds-div', 'none', oddsFieldsDiv)
    totalOddsDiv.setAttribute('id', `total-div-${matchupIndex}`)
    totalOddsDiv.addEventListener('click', () => {
        betTypeDict[matchupIndex] = 'total'
        document.getElementById(`spread-div-${matchupIndex}`).className = 'odds-div'
        document.getElementById(`moneyline-div-${matchupIndex}`).className = 'odds-div'
        document.getElementById(`total-div-${matchupIndex}`).className = 'odds-div-selected'
    })
    const totalOddsHeaderDiv = createDOMElement('div', 'odds-header', 'none', totalOddsDiv)
    createDOMElement('div', 'matchup-text', 'TOTAL', totalOddsHeaderDiv)
    const total1Field = createDOMElement('input', 'odds-field w-input', 'none', totalOddsDiv)
    total1Field.setAttribute('id', `total-field-1-${matchupIndex}`)
    total1Field.placeholder = 'Enter Odds'
    const total2Field = createDOMElement('input', 'odds-field w-input', 'none', totalOddsDiv)
    total2Field.setAttribute('id', `total-field-2-${matchupIndex}`)
    total2Field.placeholder = 'Enter Odds'


}
