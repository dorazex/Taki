import React from 'react';
import CardComp from './card';
import '../style.css';

export default class PlayerComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlayerName: ''
        };

        this.getCurrentPlayerName();
    }


    getCurrentPlayerName() {
        return fetch('/game/currentPlayerName', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(currentPlayerName => {
                this.setState(() => ({ currentPlayerName }));
            })
            .catch(err => { throw err });
    }

    render() {
        const { player, playerKey, cardClicked, colorChosen, username } = this.props;
        const currentPlayer = this.state.currentPlayerName;
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
                        cardClicked={cardClicked}
                        colorChosen={colorChosen}
                    />)}
            </div>
        )
    }
}