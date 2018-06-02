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
        var mainClassName = "player-cards-flex-container";
        var disabledClassName = "disabled-regular";
        var currentPlayerClassName = "currentplayerdiv";
        var finalClassName = mainClassName;
        if (currentPlayer == player){
            finalClassName += " " + currentPlayerClassName;
        }
        if (game.navigateMode){
            finalClassName += " " + disabledClassName;
        }
        const className = finalClassName;

        return(
            <div id={`player-container-${playerKey}`}
             className={className}>
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