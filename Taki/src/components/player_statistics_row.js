import React from 'react';

export default class PlayerStatisticsRowComp extends React.Component {
    render(){
        const { playerKey, game, player } = this.props;

        return (
            <tr>
                <th>{playerKey}</th>
                <th>{this.miliSecondsToTimeString(game.players[playerKey].statistics.avgTurnsDurationsCurrentGame)}</th>
                <th>{game.players[playerKey].statistics.singleCardCount}</th>
            </tr>
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
