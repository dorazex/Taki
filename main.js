function main() {
	var parent = document.getElementById("player-bottom-flex-container");
    console.log(parent);
    var node = document.createElement("div");
    var child = parent.appendChild(node);
    console.log(child);
    child.innerHTML = "<img src=\"cards/card0002.png\"/>"
    child.addEventListener('click', function(){alert('asdasd')})
}
