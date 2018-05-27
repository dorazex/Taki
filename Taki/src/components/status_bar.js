import React from 'react';
import Validations from '../models/utilities';

const StatusBarComp = (props) => {
    function tick() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td><button onclick={props.handleWithDraw}>Withdraw!</button></td>
                        <td><div>Turn of: {props.players[props.game.currentPlayerIndex].isComputerPlayer == true ? "Computer" : "Human"}</div></td>
                        <td><div>Color: {props.currentColor}</div></td>
                        <td><div>Turns Count: {props.game.statistics.turnsCount}</div></td>
                        <td><div>Game Duration: {miliSecondsToTimeString(props.game.statistics.getGameDuration())}</div></td>
                        <td><div>Turn Average Duration: {miliSecondsToTimeString(props.game.players[props.game.currentPlayerIndex].statistics.avgTurnsDurationsCurrentGame)}</div></td>
                        <td><div>Turn Average Duration All Games: {miliSecondsToTimeString(props.game.players[props.game.currentPlayerIndex].statistics.avgTurnsDurationsAllGames)};</div></td>
                        <td><div>Single Card Count: {props.game.players[props.game.currentPlayerIndex].statistics.singleCardCount}</div></td>
                        <td><div>{props.game.message}</div></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    setInterval(tick, 100);
};

export default StatusBarComp;



