import React from 'react';
import PlayerStatisticsRowComp from './player_statistics_row';

export default class EndGameStatisticsComp extends React.Component {
    render(){
        const {show, handleClose, game, newGame, handleNavigate } = this.props;
        const showHideClassName = show ? "end-game-modal display-block" : "end-game-modal display-none";

        return (
                <div className={showHideClassName}>
                    <font id="end-game-modal-winner-title"></font>
                    <br/><br/>
                    <table width="100%" height="100%" id="game-statistics-table">
                        <tbody>
                            <tr>
                                <td>Turns count</td>
                                <td id="end-turns-count">{game.statistics.turnsCount}</td>
                            </tr>
                            <tr>
                                <td>Game duration</td>
                                <td id="end-game-duration">{this.miliSecondsToTimeString(game.statistics.getGameDuration())}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <table width="100%" height="100%" id="players-statistics-table">
                        <tbody>
                            <tr>
                                <th>Player</th>
                                <th>Avg turn duration</th>
                                <th>Single card occasions</th>
                            </tr>
                            {game.players.map(
                                (player, i) => <PlayerStatisticsRowComp
                                 key={i}
                                 playerKey={i}
                                 game={game} 
                                 player={player} 
                                 />)}
                        </tbody>
                    </table>
                    <br/><br/>
                    <div  align="center">
                        <button id="end-new-game-button" onClick={newGame}>New Game</button>
                        <button id="navigate-game-button" onClick={handleNavigate}>Navigate</button>
                        <button id="close-end-game-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
        )
    }

    miliSecondsToTimeString(timeInMiliSeconds) {
        var timeInSeconds = Math.round(timeInMiliSeconds / 1000);
        var seconds = Math.floor(timeInSeconds % 60)
        var minutes = Math.floor(timeInSeconds / 60);
        var hours = Math.floor(minutes / 60);
        return hours + ":" + minutes + ":" + seconds
    }
};
