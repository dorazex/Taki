class Card {
	constructor(color, number, action) {
		this.action = action;  // null if card is a regular number card
		this.number = number;  // null if card is not a regular number card
		this.color = color;    // null if card is not colored
	}

	getFileName() {
		var text = "";
		if (null != this.action) {
			text += this.action.toString();
		} else {
			text += "0";
		}
		text += "_";

		if (null != this.number) {
			text += this.number.toString();
		} else {
			text += "0";
		}
		text += "_";

		if (null != this.color) {
			text += this.color.toString();
		} else {
			text += "0";
		}
		text += ".png";

		return text;
	}

	isValidStartCard() {
		return this.number != null
	}
}

module.exports = Card;