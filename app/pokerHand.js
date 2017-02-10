var cardsValues = {};

main();

function main() {
    console.log('Le jeu de poker commence')
    initCardsValue();
    startGame('2H 3D 5S 2C KD', '2C 3H 4S 8C AH');
    console.log('Fin du jeu');
}

function initCardsValue() {
    cardsValues['2'] = 2;
    cardsValues['3'] = 3;
    cardsValues['4'] = 4;
    cardsValues['5'] = 5;
    cardsValues['6'] = 6;
    cardsValues['7'] = 7;
    cardsValues['8'] = 8;
    cardsValues['9'] = 9;
    cardsValues['10'] = 10;
    cardsValues['J'] = 11;
    cardsValues['Q'] = 12;
    cardsValues['K'] = 13;
    cardsValues['A'] = 14;
}

function startGame(firstHand, secondHand) {
    var parsedFirstHand = parseHand(firstHand);
    var parsedSecondHand = parseHand(firstHand);
    
    var firstHandNbOccurences = countNbOccurencesOfEachCard(parsedFirstHand);
    var secondHandNbOccurences = countNbOccurencesOfEachCard(parsedSecondHand);

    computeCombination(parsedFirstHand, firstHandNbOccurences);
    return 1;
}

function computeCombination(parsedHand, handNbOccurences) {
    //checkPaire(parsedHand, handNbOccurences);
}

function parseHand(hand) {
    var cards = hand.split(' ');
    var parsedCards = [];
    for (var card of cards) {
        var value = card.charAt(0);
        var color = card.charAt(1);
        parsedCards.push([value, color])
    }
    return parsedCards;
}

function countNbOccurencesOfEachCard(firstHand) {
    var obj = { };
    for (var i = 0, j = firstHand.length; i < j; i++) {
        if (obj[firstHand[i][0]])
            obj[firstHand[i][0]]++;
        else
            obj[firstHand[i][0]] = 1;
    }
    return obj;
}

function valueToString(value) {
    var  cardsValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    return cardsValues[value - 2];
}

function highestCard(parsedHand) {
    var highestValue = 0;
    for (var i = 0; i < parsedHand.length; i++) {      
        if (cardsValues[parsedHand[i][0]] > highestValue)
            highestValue = cardsValues[parsedHand[i][0]];
    }
    return valueToString(highestValue);
}

function checkPaires(parsedHand, handOccurences) {
    var paires = [];
    for (var i = 0; i < parsedHand.length; i++) {
        if (handOccurences[parsedHand[i][0]] === 2) {
            if (paires.length === 0)
                paires.push(parsedHand[i][0]);
            else if ((paires[paires.length - 1] !== parsedHand[i][0]))
                paires.push(parsedHand[i][0]);
        }
    }
    return paires;
}

function threeOfAKind(parsedHand, handOccurences) {
    var threeOfAKind = 0;
    for (var i = 0; i < parsedHand.length; i++) {
        if (handOccurences[parsedHand[i][0]] === 3)
            threeOfAKind = parsedHand[i][0];
    }
    return threeOfAKind;
}

function straightHand(parsedHand) {
    var consecutiveNb = [];
    parsedHand.sort();
    for (var i = 0; i < parsedHand.length - 1; i++) {
        if (cardsValues[parsedHand[i][0]] + 1 === cardsValues[parsedHand[i + 1][0]]) 
            consecutiveNb.push(parsedHand[i][0]);
    }
    if (cardsValues[parsedHand[3][0]] + 1 === cardsValues[parsedHand[4][0]])
        consecutiveNb.push(parsedHand[4][0]);
    return consecutiveNb;
}

function flushHand(parsedHand) {
    var consecutiveColorNb = 0;
    for (var i = 0; i < parsedHand.length - 1; i++)
        if (parsedHand[i][1] === parsedHand[i + 1][1])
            consecutiveColorNb++;
    if (parsedHand[3][1] === parsedHand[4][1])
        consecutiveColorNb++
    return consecutiveColorNb;
}

function straightFlushHand(parsedHand) {
    var result = straightHand(parsedHand);
    var consecutiveColorNb = flushHand(parsedHand);
    if (result.length === 5 && consecutiveColorNb === 5)
        return parsedHand;
    else
        return [[]];
}

function fourOfAKind(parsedHand) {
    var nbOccurences = countNbOccurencesOfEachCard(parsedHand);
    for (var i = 0; i < parsedHand.length; i++)
        if (nbOccurences[parsedHand[i][0]] === 4)
            return parsedHand[i][0];
    return '';
}

module.exports = {
    startGame: startGame,
    parseHand: parseHand,
    flushHand: flushHand,
    checkPaire: checkPaires,
    highestCard: highestCard,
    fourOfAKind: fourOfAKind,
    threeOfAKind: threeOfAKind,
    straightHand: straightHand,
    straightFlushHand: straightFlushHand,
    countNbOccurencesOfEachCard: countNbOccurencesOfEachCard,
}
