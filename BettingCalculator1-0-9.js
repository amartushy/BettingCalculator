//HTML Elements
const matchupArea = document.getElementById('matchup-area')
const addMatchupButton = document.getElementById('add-matchup-button')
const clearButton = document.getElementById('clear-button')
const bettingPowerField = document.getElementById('betting-power-field')
const calculateBetsButton = document.getElementById('calculate-bets-button')

const betsArea = document.getElementById('bets-area')
const betsSummary = document.getElementById('bets-summary')
const totalActionText = document.getElementById('total-action-text')
const averageWinAmountText = document.getElementById('average-win-amount-text')

//Global Variables
var matchupDict = {}
var betTypeDict = {}
var bettingPower = 1000
var numParlays = 0
var totalAction = 0
var totalWinAmount = 0

//Onload and Event Listeners
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

    betsSummary.style.display = 'none'

    matchupDict = {}

    betTypeDict = {}

    bettingPower = 1000

    numParlays = 0



    addMatchup()
}

addMatchupButton.addEventListener('click', () => {
    addMatchup()
})

clearButton.addEventListener('click', () => {
    loadMyBookieCalculator()
})

bettingPowerField.addEventListener('blur', () => {
    bettingPower = parseFloat(bettingPowerField.value)
})

bettingPowerField.addEventListener('focus', () => {
    bettingPowerField.placeholder = ''
})

calculateBetsButton.addEventListener('click', () => {
    calculateBets()
})





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
    team1Field.addEventListener('focus', () => {
        team1Field.placeholder = ''
    })
    team1Field.placeholder = 'Team 1'

    const team2FieldDiv = createDOMElement('div', 'field-div', 'none', teamNameFields)
    const team2Field = createDOMElement('input', 'name-field w-input', 'none', team2FieldDiv)
    team2Field.setAttribute('id', `team-field-2-${matchupIndex}`)
    team2Field.addEventListener('focus', () => {
        team2Field.placeholder = ''
    })
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
    spread1Field.addEventListener('focus', () => {
        spread1Field.placeholder = ''
    })
    spread1Field.placeholder = 'Enter Odds'
    const spread2Field = createDOMElement('input', 'odds-field w-input', 'none', spreadOddsDiv)
    spread2Field.setAttribute('id', `spread-field-2-${matchupIndex}`)
    spread2Field.addEventListener('focus', () => {
        spread2Field.placeholder = ''
    })
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
    moneyline1Field.addEventListener('focus', () => {
        moneyline1Field.placeholder = ''
    })
    moneyline1Field.placeholder = 'Enter Odds'
    const moneyline2Field = createDOMElement('input', 'odds-field w-input', 'none', moneylineOddsDiv)
    moneyline2Field.setAttribute('id', `moneyline-field-2-${matchupIndex}`)
    moneyline2Field.addEventListener('focus', () => {
        moneyline2Field.placeholder = ''
    })
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
    total1Field.addEventListener('focus', () => {
        total1Field.placeholder = ''
    })
    total1Field.placeholder = 'Enter Odds'
    const total2Field = createDOMElement('input', 'odds-field w-input', 'none', totalOddsDiv)
    total2Field.setAttribute('id', `total-field-2-${matchupIndex}`)
    total2Field.addEventListener('focus', () => {
        total2Field.placeholder = ''
    })
    total2Field.placeholder = 'Enter Odds'


}



function calculateBets() {

    getMatchupValues()


    while (betsArea.firstChild) {
        betsArea.removeChild(betsArea.firstChild)
    }

    var numMatchups = Object.keys(matchupDict).length 
    numParlays = Math.pow(2, numMatchups)
    var parlays = [...Array(numParlays)].map(e => Array())

    var divisor = 2
    for (i = 0; i < numMatchups ; i++) {
        var numItemsAdded = 0
        var alternatorVal = numParlays / divisor

        for(j = 0; j < numParlays; j++) {

            if(numItemsAdded < alternatorVal ){
                parlays[j].push( `${matchupDict[i]['betType']}1` )
                numItemsAdded += 1
            } else {
                parlays[j].push( `${matchupDict[i]['betType']}2` )
                numItemsAdded += 1

                if(numItemsAdded == alternatorVal*2) {
                    numItemsAdded = 0
                }
            }

            console.log(numItemsAdded)

        }
        numItemsAdded = 0
        divisor  = divisor * 2
    }

    buildParlays(parlays)
}





function getMatchupValues() {

    for (i = 0; i < Object.keys(matchupDict).length ; i++) {

        var newMatchupDict = {
            'team1' : document.getElementById(`team-field-1-${i}`).value,
            'team2' : document.getElementById(`team-field-2-${i}`).value,
            'spread1': parseFloat(document.getElementById(`spread-field-1-${i}`).value),
            'spread2' : parseFloat(document.getElementById(`spread-field-1-${i}`).value),
            'moneyline1' : parseFloat(document.getElementById(`moneyline-field-1-${i}`).value),
            'moneyline2' : parseFloat(document.getElementById(`moneyline-field-2-${i}`).value),
            'total1' : parseFloat(document.getElementById(`total-field-1-${i}`).value),
            'total2' : parseFloat(document.getElementById(`total-field-2-${i}`).value),
            'betType' : betTypeDict[i]
        }

        matchupDict[i] = newMatchupDict
    }
}


function buildParlays(parlayArray) {

    parlayArray.forEach( (parlay, index) => {
        const parlayContainer = createDOMElement('div', 'parlay-container', 'none', betsArea)
        const parlayHeader = createDOMElement('div', 'parlay-header', 'none', parlayContainer)
        createDOMElement('div', 'parlay-header-text', `Parlay ${index+1} of ${parlayArray.length}`, parlayHeader)
        const payoutDiv = createDOMElement('div', 'payout-div', 'none', parlayHeader)
        createDOMElement('div', 'bet-amount-text', `Bet Amount: $${getBetAmount(parlay)}`, payoutDiv)
        createDOMElement('div', 'bet-amount-text', `Potential Win Amount: $${getWinAmount(parlay)}`, payoutDiv)
        
        parlay.forEach( (selection, selectionIndex) => {
            var matchupInfo = matchupDict[selectionIndex]

            const betBlock = createDOMElement('div', 'bet-block', 'none', parlayContainer)
            const betTeamsDiv = createDOMElement('div', 'bet-teams-div', 'none', betBlock)
            const betHeader = createDOMElement('div', 'bet-header', 'none', betTeamsDiv)
            createDOMElement('div', 'bet-header-teams-text', `MATCHUP ${selectionIndex}`, betHeader)
            const betTeamDiv1 = createDOMElement('div', 'bet-team-div', 'none', betTeamsDiv)
            createDOMElement('div', 'bet-team-text', matchupInfo['team1'], betTeamDiv1)
            const betTeamDiv2 = createDOMElement('div', 'bet-team-div', 'none', betTeamsDiv)
            createDOMElement('div', 'bet-team-text', matchupInfo['team2'], betTeamDiv2)

            const betOddsContainer = createDOMElement('div', 'bet-odds-container', 'none', betBlock)
            const betSpreadDiv = createDOMElement('div', 'bet-odds-div', 'none', betOddsContainer)
            const betSpreadHeader = createDOMElement('div', 'bet-odds-header', 'none', betSpreadDiv)
            createDOMElement('div', 'bet-header-text', 'SPREAD', betSpreadHeader)
            const spread1 = createDOMElement('div', 'odds-unselected', matchupInfo['spread1'], betSpreadDiv)
            const spread2 = createDOMElement('div', 'odds-unselected', matchupInfo['spread2'], betSpreadDiv)

            const betMoneylineDiv = createDOMElement('div', 'bet-odds-div', 'none', betOddsContainer)
            const betMoneylineHeader = createDOMElement('div', 'bet-odds-header', 'none', betMoneylineDiv)
            createDOMElement('div', 'bet-header-text', 'Moneyline', betMoneylineHeader)
            const moneyline1 = createDOMElement('div', 'odds-unselected', matchupInfo['moneyline1'], betMoneylineDiv)
            const moneyline2 = createDOMElement('div', 'odds-unselected', matchupInfo['moneyline2'], betMoneylineDiv)

            const betTotalDiv = createDOMElement('div', 'bet-odds-div', 'none', betOddsContainer)
            const betTotalHeader = createDOMElement('div', 'bet-odds-header', 'none', betTotalDiv)
            createDOMElement('div', 'bet-header-text', 'TOTAL', betTotalHeader)
            const total1 = createDOMElement('div', 'odds-unselected', matchupInfo['total1'], betTotalDiv)
            const total2 = createDOMElement('div', 'odds-unselected', matchupInfo['total2'], betTotalDiv)

            switch(selection) {
                case 'moneyline1':
                    moneyline1.className = 'odds-selected'
                    break;

                case 'moneyline2':
                    moneyline2.className = 'odds-selected'
                    break;

                case 'total1':
                    total1.className = 'odds-selected'
                    break;

                case 'total2':
                    total2.className = 'odds-selected'
                    break;

                case 'spread1':
                    spread1.className = 'odds-selected'
                    break;
                case 'spread2':
                    spread2.className = 'odds-selected'
                    break;

            }
        })
    })

    betsSummary.style.display = 'block'
    totalActionText.innerHTML = 'Total Action: $' + totalAction.toFixed(2)
    var average = totalAction / numParlays
    averageWinAmountText.innerHTML = 'Average Win Amount: $' + average.toFixed(2)

}








//Helper Functions
function createDOMElement(type, classStr, text, parentElement) {
    let DOMElement = document.createElement(`${type}`)
    DOMElement.className = classStr
  
    if(text != 'none') {
      DOMElement.innerHTML = text
    }
  
    if(parentElement != 'none') {
      parentElement.appendChild(DOMElement)
    }
  
    return(DOMElement)
}

function getBetAmount(parlay) {
    var betAmount = bettingPower / numParlays
    return betAmount.toFixed(2)
}


function getWinAmount(parlay) {
    console.log(parlay)

    var multiplier = 1

    parlay.forEach( (bet, index) => {
        var oddsVal = parseFloat(matchupDict[index][bet])
        var newMultiplier

        if(oddsVal > 0) {
            newMultiplier = (oddsVal / 100) + 1
            console.log('new multiplier: ', newMultiplier)
        } else {
            newMultiplier = (100 / (-1 * oddsVal)) + 1
            console.log('new multiplier: ', newMultiplier)
        }

        multiplier = multiplier * newMultiplier
        console.log(multiplier)
    })

    var betAmount = bettingPower / numParlays
    var winAmount = (betAmount * multiplier) - betAmount

    totalAction += winAmount

    return winAmount.toFixed(2)
}
