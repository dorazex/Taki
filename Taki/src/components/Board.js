import React from 'react';
import Decks from './Decks';
import Cards from './Cards';

const Board = (props) => {
    return (
        <div id="game" class="game-flex" >
            <div id="board" class="board-flex-container">
                <DecksComponent game={props.game} deckClicked={props.deckClicked} />
            </div>
            <div id="players">
                {
                    props.game.players.map((player, i) => (
                        <CardsComponent
                            key={i}
                            game={props.game}
                            player={player}
                            activeCardOnClick={props.activeCardOnClick}
                            activeChangeColor={props.activeChangeColor}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Board;

