var expect = require("chai").expect;
var game = require("../app/pokerHand");

describe("Poker Hand Tests", function() {

    var firstHand = "10H 3D 5S 9C KD";
    var secondHand = "2C 3H 4S 8C AH";

    it("Start Game Function", function() {
        expect(game.startGame(firstHand, secondHand)).to.equal(1);
    });

    it("Parse Hand Function", function() {
        var expectedResult = [['10','H'], ['3','D'], ['5','S'], ['9','C'], ['K','D']]
        expect(game.parseHand(firstHand)).to.eql(expectedResult);
    });

    it("Count Nb Of Occurences Function", function() {
        var parsedHand = [['2','H'], ['2','D'], ['2','S'], ['9','C'], ['K','D']]
        var expectedResult = {};
        expectedResult['2'] = 3;
        expectedResult['9'] = 1;
        expectedResult['K'] = 1;
        expect(game.countNbOccurencesOfEachCard(parsedHand)).to.eql(expectedResult);
    });

    it("Check Highest Card Function", function() {
        var parsedHand = [['2','H'], ['2','D'], ['2','S'], ['9','C'], ['K','D']]
        expect(game.highestCard(parsedHand)).to.eql('K');
    });

    it("Check Paire Function", function() {
        var parsedHand = [['3','H'], ['3','D'], ['K','S'], ['2','C'], ['4','D']]
        var expectedResult = ['3'];
        var nbOccurences = {};
        nbOccurences['2'] = 1;
        nbOccurences['3'] = 2;
        nbOccurences['4'] = 1;
        nbOccurences['K'] = 1;
        expect(game.checkPaire(parsedHand, nbOccurences)).to.eql(expectedResult);
    });

    it("Check Double Paire Function", function() {
        var parsedHand = [['3','H'], ['3','D'], ['K','S'], ['4','C'], ['4','D']]
        var expectedResult = ['3', '4'];
        var nbOccurences = {};
        nbOccurences['K'] = 1;
        nbOccurences['3'] = 2;
        nbOccurences['4'] = 2;
        expect(game.checkPaire(parsedHand, nbOccurences)).to.eql(expectedResult);
    });

    it("Check Three Of A Kind Function", function() {
        var parsedHand = [['10','H'], ['10','D'], ['K','S'], ['K','C'], ['K','D']]
        var expectedResult = 'K';
        var nbOccurences = {};
        nbOccurences['K'] = 3;
        nbOccurences['10'] = 2;
        expect(game.threeOfAKind(parsedHand, nbOccurences)).to.eql(expectedResult);
    });

    it("Check Straight Hand Function", function() {
        var parsedHand = [['4','H'], ['7','D'], ['5','S'], ['6','C'], ['3','D']]
        var expectedResult = ['3','4','5','6','7'];
        expect(game.straightHand(parsedHand)).to.eql(expectedResult);
    });

    it("Check Flush Hand Function", function() {
        var parsedHand = [['4','H'], ['7','H'], ['5','H'], ['6','H'], ['3','H']]
        var expectedResult = 5;
        expect(game.flushHand(parsedHand)).to.eql(expectedResult);
    }); 

    it("Four of A Kind Function", function() {
        var parsedHand = [['4','H'], ['4','H'], ['5','H'], ['4','H'], ['4','H']]
        expect(game.fourOfAKind(parsedHand)).to.eql('4');
    }); 

    it("Straight Flush Function", function() {
        var parsedHand = [['3','H'], ['4','H'], ['6','H'], ['5','H'], ['7','H']]
        var expectedResult = ['3','4','5','6','7'];
        expect(game.straightFlushHand(parsedHand)).to.eql(parsedHand);
    });

  });