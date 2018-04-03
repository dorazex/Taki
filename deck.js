function deck() {
    var colors = ["green", "red", "yellow", "blue"];
    var cardFaceNumber = [1, 3, 4, 5, 6, 7, 8, 9];
    var cardFaceOperationWithColors = ["taki", "stop"];
    var cardFaceOperationWithoutColors = ["changeColor"];
    var cards = [];

    function buildCards() {
        cards = [];
        for (var k = 0; k < 2; k++) {
            for (i in colors) {
                for (j in cardFaceNumber) {
                    cards.push(new card(colors[i], cardFaceNumber[j], false, null));
                }
            }
        }

        for (var k = 0; k < 2; k++) {
            for (i in colors) {
                for (j in cardFaceOperationWithColors) {
                    cards.push(new card(colors[i], null, true, cardFaceOperationWithColors[j]));
                }
            }
        }

        for (var i = 0; i < 4; i++) {
            cards.push(new card(null, null, true, "changeColor"));
        }
    }

    //public methods


    this.buildDeck = function () {
        buildCards();
        cards = shuffleArray(cards);
        return cards;
    }
}

// function Module() {

//     // private variables and functions
//     var foo = 'bar';

//     //public methods
//     this.something = function () {

//     }
// }


// var deck = (function () {
//     var colors = ["green", "red", "yellow", "blue"];
//     var cardFaceNumber = [1, 3, 4, 5, 6, 7, 8, 9];
//     var cardFaceOperationWithColors = ["taki", "stop"];
//     var cardFaceOperationWithoutColors = ["changeColor"];
//     var cards = [];

//     function buildCards() {
//         cards = [];
//         for (i in colors) {
//             for (j in cardFaceNumber) {
//                 for (var k = 0; k < 1; k++) {
//                     cards.push(new card(i, j, false, null));
//                 }
//             }
//         }

//         for (i in colors) {
//             for (j in cardFaceOperationWithColors) {
//                 for (var k = 0; k < 1; k++) {
//                     cards.push(new card(i, null, true, j));
//                 }
//             }
//         }

//         for (var i = 0; i < 4; i++) {
//             cards.push(new card(null, null, true, "changeColor"));
//         }
//     }


//     function shuffleArray(array) {
//         for (var x = array.length - 1; x > 0; x--) {
//             var i = Math.floor(Math.random() * (x + 1));
//             var temp = array[x];
//             array[x] = array[i];
//             array[i] = temp;
//         }
//         return array;
//     }


//     return {

//         publicProperty: '',

//         buildDeck: function () {
//            buildCards();
//            shuffleArray(cards);
//         },

//         privilegedMethod: function (args) {
//             return privateMethod(args);
//         }
//     };

//     return deck;
// })();
