function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
        var i = Math.floor(Math.random() * (x + 1));
        var temp = array[x];
        array[x] = array[i];
        array[i] = temp;
    }
    return array;
}