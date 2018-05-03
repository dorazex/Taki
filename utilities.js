var COLORS = ["green", "red", "yellow", "blue"];
var NUMBERS = [1, 3, 4, 5, 6, 7, 8, 9];
var ACTIONS_W_COLORS = ["taki", "stop", "plus"];
var ACTIONS_WO_COLORS = ["changeColor"];
var NUM_INITIAL_CARDS = 8;

function shuffleArray(array) {
	for (var x = array.length - 1; x > 0; x--) {
		var i = Math.floor(Math.random() * (x + 1));
		var temp = array[x];
		array[x] = array[i];
		array[i] = temp;
	}
	return array;
}

function isChildExistById(parentId, childId) {
	var isExist = false;
	parentDiv = document.getElementById(parentId)
	childDiv = document.getElementById(childId)
	if (parentDiv == null || childDiv == null) { return false; }
	parentDiv.childNodes.forEach(function (node) {
		if (node.id == childId) {
			isExist = true;
		}
	})
	return isExist;
};

function miliSecondsToTimeString(timeInMiliSeconds) {
	var timeInSeconds = Math.round(timeInMiliSeconds / 1000);
	var seconds = Math.floor(timeInSeconds % 60)
	var minutes = Math.floor(timeInSeconds / 60);
	var hours = Math.floor(minutes / 60);
	return hours + ":" + minutes + ":" + seconds
}

function clearArray(array) {
	while (array.length) {
		array.pop();
	}
}