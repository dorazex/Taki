import React from 'react';

const DecksComp = (props) => {
    return (
        <div>
            <div className="deck-container">
                <div id="deck" onclick={props.deckClicked} className={props.game.players[props.game.currentPlayerIndex].isComputerPlayer == false ? 'disable' : 'enable'}>
                    <img src="../cards/cover_0_0.png" onMouseOver="" styles="cursor: pointer;" />
                </div>
                <div id="deck-text" className="deck-text">{props.game.deck.getNumberOfCards()}</div>
                <div><button id="finish-turn" styles={{ visibility: props.game.currentAction == "taki" ? 'visible' : 'hidden' }} className="deck-finish-turn-button" onclick={props.finishTurnOnClick} back></button></div>
            </div>
            <div id="open-deck">
                <img src="../cards/{props.game.openDeck.getTopCard().getFileName()}" />
            </div>
        </div>
    );
};

export default DecksComp;