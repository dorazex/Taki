import React from 'react';
import CardComp from './card';
import '../style.css';

export default class PlayerComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { player, playerKey, cardClicked, colorChosen, username } = this.props;
        const currentPlayer = this.props.currentPlayerName;
        var mainClassName = "player-cards-flex-container";
        var disabledClassName = "disabled-regular";
        var currentPlayerClassName = "currentplayerdiv";
        var finalClassName = mainClassName;
        if (currentPlayer == player.name) {
            finalClassName += " " + currentPlayerClassName;
        }
        const className = finalClassName;

        return (
            <div id={`player-container-${playerKey}`} className={className}>
                <div> {player.name}</div>
                {player.cards.map(
                    (card, i) => <CardComp
                        key={i}
                        cardKey={i}
                        card={card}
                        player={player}
                        playerKey={playerKey}
                        username={username}
                        currentPlayerName={currentPlayer}
                        cardClicked={cardClicked}
                        colorChosen={colorChosen}
                    />)}
            </div>
        )
    }
}