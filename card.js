function Card(color, number, action) {
  this.action = action;  // null if card is a regular number card
  this.number = number;  // null if card is not a regular number card
  this.color = color;    // null if card is not colored

  this.getColor = function() {
	  return this.color;
  }

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

  this.isValidStartCard = function(){
  	return this.number != null
  }
}

