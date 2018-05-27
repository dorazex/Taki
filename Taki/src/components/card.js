import React from 'react';
import '../style.css';

export default class CardComp extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            cardKey: props.cardKey,
            card: props.card,
            player: props.player,
            game: props.game,
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log("card onClick")
        props.onCardClicked(props.cardKey, props.player);
    };

    render (){
        const { cardKey, card, player, game } = this.state;

        return(
            <div className="card-container" onClick={this.onClick}>
                        {
                            player.isComputerPlayer == false ?
                                <img src={`cards/${card.getFileName()}`} style={{cursor: "pointer"}} /> :
                                <img src="cards/cover_0_0.png" />
                        }
            </div>
        )
    }
}
