var cardsValues = {};

var parseHand = hand => hand.split(' ').map(x => [x.charAt(0), x.charAt(1)]);

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

function countNbOccurencesOfEachCard(hand) {
    return hand.reduce((acc, [value, color]) => {
        acc[value] = value in acc ? acc[value] + 1 : 1
        return acc;
    }, {})
}

const valueToString = value => ['2','3','4','5','6','7','8','9','10','J','Q','K','A'][value - 2]

var highestCard = hand => [...hand].sort(([value, color]) => value)[0][0]

function checkPaires(hand, handOccurences) {
    var paires = [];
    for (var i = 0; i < hand.length; i++) {
        if (handOccurences[hand[i][0]] === 2) {
            if (paires.length === 0)
                paires.push(hand[i][0]);
            else if ((paires[paires.length - 1] !== hand[i][0]))
                paires.push(hand[i][0]);
        }
    }
    return paires;
}

function threeOfAKind(hand, handOccurences) {
    var threeOfAKind = 0;
    for (var i = 0; i < hand.length; i++) {
        if (handOccurences[hand[i][0]] === 3)
            threeOfAKind = hand[i][0];
    }
    return threeOfAKind;
}

function straightHand(hand) {
    var consecutiveNb = [];
    hand.sort();
    for (var i = 0; i < hand.length - 1; i++) {
        if (cardsValues[hand[i][0]] + 1 === cardsValues[hand[i + 1][0]]) 
            consecutiveNb.push(hand[i][0]);
    }
    if (cardsValues[hand[3][0]] + 1 === cardsValues[hand[4][0]])
        consecutiveNb.push(hand[4][0]);
    return consecutiveNb;
}

function flushHand(hand) {
    var consecutiveColorNb = 0;
    for (var i = 0; i < hand.length - 1; i++)
        if (hand[i][1] === hand[i + 1][1])
            consecutiveColorNb++;
    if (hand[3][1] === hand[4][1])
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

function main() {
    console.log('Le jeu de poker commence')
    initCardsValue();
    startGame('2H 3D 5S 2C KD', '2C 3H 4S 8C AH');
    console.log('Fin du jeu');
}

main();

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