function Player(isComputerPlayer) {
    this.cards = [];
    this.isComputerPlayer = isComputerPlayer;
    this.statistics = new PlayerStatistics();

    this.addCards = function (cards) {
        this.cards = this.cards.concat(cards);
    };

    this.endTurn = function (cardsPut){
    	if (this.cards.length!=1 && this.cards.length - cardsPut == 1){
    		this.statistics.singleCardCount++;
    	}
    	return cardsPut;
    }

    this.computerPlay = function (topCard, currentColor) {
        res = []

        for (var i = this.cards.length - 1; i >= 0; i -= 1) {
            if (this.cards[i].action == "changeColor") {
                res.push([i, this.cards[i]]);
                this.cards.splice(i, 1);
                return this.endTurn(res);
            }
        }

        for (var i = this.cards.length - 1; i >= 0; i -= 1) {
            if (this.cards[i].action == "stop" && this.cards[i].color == currentColor) {
                res.push([i, this.cards[i]]);
                this.cards.splice(i, 1);
                return this.endTurn(res);
            }
        }

        for (var i = this.cards.length - 1; i >= 0; i -= 1) {
            if (this.cards[i].action == "taki" && this.cards[i].color == currentColor) {
                res.push([i, this.cards[i]]);
                this.cards.splice(i, 1);
                for (var j = this.cards.length - 1; j >= 0; j -= 1) {
                    if (this.cards[j].color == currentColor) {
                        if(j < i) 
                            res.push([j, this.cards[j]]);
                        else  res.push([j + 1, this.cards[j]]);
                        this.cards.splice(j, 1);
                    }
                }
                return this.endTurn(res);
            }
        }

        for (var i = this.cards.length - 1; i >= 0; i -= 1) {
            if (this.cards[i].color == currentColor) {
                res.push([i, this.cards[i]]);
                this.cards.splice(i, 1);
                return this.endTurn(res);
            }
        }

        if (topCard.number != null) {
            for (var i = this.cards.length - 1; i >= 0; i -= 1) {
                if (this.cards[i].number == topCard.number) {
                    res.push([i, this.cards[i]]);
                    this.cards.splice(i, 1);
                    return this.endTurn(res);
                }
            }
        }

        return this.endTurn(res);
    }
};