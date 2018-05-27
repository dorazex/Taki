import React from 'react';
import DecksComp from './decks';
import CardsComp from './cards';

const BoardComp = (props) => {
    return (
        <div id="game" class="game-flex" >
            <div id="board" class="board-flex-container">
                <DecksComp game={props.game} deckClicked={props.deckClicked} />
            </div>
            <div id="players">
                {
                    props.game.players.map((player, i) => (
                        <CardsComp
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

export default BoardComp;

