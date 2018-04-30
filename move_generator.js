function MoveGenerator() {
	this.play = function (cards, topCard, currentColor, action) {
		res = []

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
			if (cards[i].action == "changeColor") {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if (cards[i].action == "stop" && cards[i].color == currentColor) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		
		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if (cards[i].action == "plus" && cards[i].color == currentColor) {
				res.push(i);
				res.push(cards[i]);
				return res;
			}
		}

		for (var i = cards.length - 1; i >= 0; i -= 1) {
			if (cards[i].action == "taki" && cards[i].color == currentColor) {
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