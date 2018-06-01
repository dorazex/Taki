import React from 'react';
import CardComp from './card';
import '../style.css';

export default class PlayerComp extends React.Component {
    constructor(props) {
        super(props);


    }

    render (){
        const { player, game, playerKey, cardClicked, colorChosen } = this.props;
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