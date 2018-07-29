import React from 'react';
import PlayerStatisticsRowComp from './player_statistics_row';
import * as utilities from '../models/utilities';

const EndGameStatisticsComp = (props) => {
    const { show, handleClose, winners, gameStatistics } = props;
    const showHideClassName = show ? "end-game-modal display-block" : "end-game-modal display-none";

    return (
        <div>
            {show &&
                <div className={showHideClassName}>
                    <font id="end-game-modal-winner-title"></font>
                    <font>{`The winner is: ${winners[0].name}`}</font><br /><br />
                    <table width="100%" height="100%" id="game-statistics-table">
                        <tbody>
                            <tr>
                                <td>Turns count</td>
                                <td id="end-turns-count">{gameStatistics.turnsCount}</td>
                            </tr>
                            <tr>
                                <td>Game duration</td>
                                <td id="end-game-duration">{utilities.miliSecondsToTimeString(gameStatistics.gameDuration)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <table width="100%" height="100%" id="players-statistics-table">
                        <tbody>
                            <tr>
                                <th>Level</th>
                                <th> Name </th>
                                <th>Avg turn duration</th>
                                <th>Single card occasions</th>
                            </tr>
                            {winners.map(
                                (player, i) => <PlayerStatisticsRowComp
                                    key={i}
                                    playerKey={i}
                                    player={player}
                                />)}
                        </tbody>
                    </table>
                    <br /><br />
                    <div align="center">
                        <button id="close-end-game-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default EndGameStatisticsComp;