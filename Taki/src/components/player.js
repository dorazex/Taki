import React from 'react';
import CardsComp from './cards';
import CardComp from './card';
import '../style.css';

export default class PlayerComp extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            player: props.player,
            game: props.game,
            playerKey: props.playerKey,
            cardClicked: props.cardClicked,
            colorChosen: props.colorChosen,
        }

    }

    render (){
        const { player, game, playerKey, cardClicked, colorChosen } = this.state;
        const currentPlayer = game.players[game.currentPlayerIndex];
        return(
            <div id={`player-container-${playerKey}`}
             className={currentPlayer == player ? "player-cards-flex-container currentplayerdiv" : "player-cards-flex-container" }>
                {player.cards.map(
                        (card, i) => <CardComp
                         key={i}
                         cardKey={i}
                         card={card}
                         game={game} 
                         player={player} 
                         playerKey={playerKey}
                         cardClicked={cardClicked}
                         colorChosen={colorChosen}
                         />)}
            </div>
        )
    }
}