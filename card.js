function Card(color, number, action) {
  this.action = action;  // null if card is a regular number card
  this.number = number;  // null if card is not a regular number card
  this.color = color;  // null if card is not colored

  this.getFileName = function(){
  	var text = "";
  	if (null != this.action){
  		text += this.action.toString();
  	} else {
  		text += "0";
  	}
  	text += "_";

  	if (null != this.number){
  		text += this.number.toString();
  	} else {
  		text += "0";
  	}
  	text += "_";

  	if (null != this.color){
  		text += this.color.toString();
  	} else {
  		text += "0";
  	}
  	text += ".png";

	return text;
  }

  // this.isFileNameMatch = function(cardImgFileName){
  // 	var fileNameNoSuffix = cardImgFileName.split(".")[0];
  // 	cardProperties = fileNameNoSuffix.split("_");
  // 	var action = cardProperties[0];
  // 	var number = cardProperties[1];
  // 	var color = cardProperties[2];
  // 	return (((action == "0" && this.action == null) || action == this.action) && 
  // 		((number == "0" && this.number == null) || number == this.number.toString()) && 
  // 		((color == "0" && this.color == null) || color == this.color));
  // }
}

