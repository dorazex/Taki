export function shuffleArray(array) {
	for (var x = array.length - 1; x > 0; x--) {
		var i = Math.floor(Math.random() * (x + 1));
		var temp = array[x];
		array[x] = array[i];
		array[i] = temp;
	}
	return array;
}

export function miliSecondsToTimeString(timeInMiliSeconds) {
	var timeInSeconds = Math.round(timeInMiliSeconds / 1000);
	var seconds = Math.floor(timeInSeconds % 60)
	var minutes = Math.floor(timeInSeconds / 60);
	var hours = Math.floor(minutes / 60);
	return hours + ":" + minutes + ":" + seconds
}

export function clearArray(array) {
	while (array.length) {
		array.pop();
	}
}