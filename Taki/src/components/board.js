import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';
import '../style.css';

export default class BoardComp extends React.Component{
    render() {
        const { game } = this.props;

        const currentPlayer = game.players[game.currentPlayerIndex];

        return (
                <div>
                    <div id="board" className="board-flex-container">
                        <DecksComp game={game} open="false" />
                        <DecksComp game={game} open="true" />
                    </div>
                    <div id="players">
                        {game.players.map(
                            (player, i) => <PlayerComp key={i} playerKey={i} player={player} game={game}/>)}
                    </div>
                </div>
        )
    };
}
