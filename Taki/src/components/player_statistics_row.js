import React from 'react';
import * as utilities from '../models/utilities';

const PlayerStatisticsRowComp = (props) => {
    const { playerKey, game, player } = props;

    return (
        <tr>
            <th>{playerKey}</th>
            <th>{utilities.miliSecondsToTimeString(game.players[playerKey].statistics.avgTurnsDurationsCurrentGame)}</th>
            <th>{game.players[playerKey].statistics.singleCardCount}</th>
        </tr>
    )
};

export default PlayerStatisticsRowComp;
