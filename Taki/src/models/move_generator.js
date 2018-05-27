function MoveGenerator() {
	this.play = function (cards, topCard, currentColor, action, plus2) {
		res = []

		if(plus2 != 0) {
			console.log(plus2)
			for (var i = cards.length - 1; i >= 0; i -= 1) {
				if (cards[i].action == "plus2") {
				   console.log(cards[i].action)
					res.push(i);
					res.push(cards[i]);
					return res;
				}
			}
			return res;
		}

		if (action == "taki") {
			for (var i = cards.length - 1; i >= 0; i -= 1) {
				if (cards[i].color == currentColor) {
					res.push(i);
					res.push(cards[i]);
					return res;
				}
			}
			return res;
		}


		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if ((cards[i].action == "plus2" && cards[i].color == currentColor)
				|| (cards[i].action == "plus2" && topCard.action == "plus2")) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if (cards[i].action == "changeColor") {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if ((cards[i].action == "stop" && cards[i].color == currentColor)
				|| (cards[i].action == "stop" && topCard.action == "stop")) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}


		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if ((cards[i].action == "plus" && cards[i].color == currentColor)
				|| (cards[i].action == "plus" && topCard.action == "plus")) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if ((cards[i].action == "taki" && cards[i].color == currentColor)
				|| ((cards[i].action == "taki" && topCard.action == "taki"))) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if (cards[i].color == currentColor) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		if (topCard.number != null) {
			for (var i = cards.length - 1; i >= 0; i -= 1) {
				if (cards[i].number == topCard.number) {
					res.push(i);
					res.push(cards[i]);
					return res;
				}
			}
		}

		return res;
	}
}

export default MoveGenerator;