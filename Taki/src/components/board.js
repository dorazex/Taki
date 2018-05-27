import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';

export default class BoardComp extends React.Component{
    render() {
        const { game } = this.props;

        const currentPlayer = game.players[game.currentPlayerIndex];

        return (
                <div>
                    <div id="board" className="board-flex-container">
                        <DecksComp game={game} />
                    </div>
                    <div id="players">
                        {game.players.map(
                            (player, i) => <PlayerComp key={i} playerKey={i} player={player} game={game}/>)}
                    </div>
                </div>
        )
    };
}
