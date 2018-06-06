import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';
import '../style.css';

const BoardComp = (props) => {
    return (
        <div>
            <div id="board" className="board-flex-container">
                <DecksComp game={props.game} open={false} finishTurn={props.finishTurn} pullCard={props.pullCard} />
                <DecksComp game={props.game} open={true} />
            </div>
            <div id="players">
                {props.game.players.map(
                    (player, i) => <PlayerComp
                        key={i}
                        playerKey={i}
                        player={player}
                        game={props.game}
                        cardClicked={props.cardClicked}
                        colorChosen={props.colorChosen}
                    />)}
            </div>
        </div>
    )
};

export default BoardComp;


