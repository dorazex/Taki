import React from 'react';

const DecksComp = (props) => {
    const {game, open} = props;
    if (open == false){
        return (
            <div className="deck-container">
                <div id="deck" onClick={game.pullCard}>
                    <img src="cards/cover_0_0.png" styles="cursor: pointer;" />
                </div>
                <div id="deck-text" className="deck-text">
                    {game.deck.getNumberOfCards()}
                </div>
                <div>
                    <button id="finish-turn" 
                        style={{ visibility: (game.currentAction != undefined && game.currentAction == "taki") ? 'visible' : 'hidden' }} 
                        className="deck-finish-turn-button" 
                        onClick={game.finishTurnOnClick} />
                </div>
            </div>
        );
    } else {
        return (
                <div id="open-deck">
                        <img src={`cards/${game.openDeck.getTopCard().getFileName()}`}/>
                </div>
        );
    }
};

export default DecksComp;