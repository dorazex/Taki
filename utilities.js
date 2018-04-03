var COLORS = ["green", "red", "yellow", "blue"];
var NUMBERS = [1, 3, 4, 5, 6, 7, 8, 9];
var ACTIONS_W_COLORS = ["taki", "stop"];
var ACTIONS_WO_COLORS = ["changeColor"];

function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
        var i = Math.floor(Math.random() * (x + 1));
        var temp = array[x];
        array[x] = array[i];
        array[i] = temp;
    }
    return array;
}