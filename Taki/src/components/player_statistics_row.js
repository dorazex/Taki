import React from 'react';
import * as utilities from '../models/utilities';

const PlayerStatisticsRowComp = (props) => {
    const { playerKey, player } = props;

    return (
        <tr>
            <th>{playerKey + 1}</th>
            <th> {player.name} </th>
            <th>{utilities.miliSecondsToTimeString(player.statistics.avgTurnsDurationsCurrentGame)}</th>
            <th>{player.statistics.singleCardCount}</th>
        </tr>
    )
};

export default PlayerStatisticsRowComp;
