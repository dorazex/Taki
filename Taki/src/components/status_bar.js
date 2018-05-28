import React from 'react';
//import Validations from '../models/utilities.js';

export default class StatusBarComp extends React.Component {
    render() {
        const { game } = this.props;
        return (
            <div id="statistics">
                <table className="status-bar">
                    <tbody>
                        <tr>
                            <td className="status-bar-td">
                                <button id="withdraw" onClick={this.props.withdraw}>
                                    Withdraw!
                                </button>
                            </td>
                            <td className="status-bar-td"><div id="turn"></div>Turn of: {this.props.game.players[this.props.game.currentPlayerIndex].isComputerPlayer == true ? "Computer" : "Human"}</td>
                            <td className="status-bar-td"><div id="color">{this.props.game.currentColor}</div></td>
                            <td className="status-bar-td"><div id="turns-count">Turns Count: {this.props.game.statistics.turnsCount}</div></td>
                            <td className="status-bar-td"><div id="game-duration">Game Duration: {this.miliSecondsToTimeString(this.props.game.statistics.getGameDuration())}</div></td>
                            <td className="status-bar-td"><div id="turn-average">Turn Average Duration: {this.miliSecondsToTimeString(this.props.game.players[this.props.game.currentPlayerIndex].statistics.avgTurnsDurationsCurrentGame)}</div></td>
                            <td className="status-bar-td"><div id="turn-average-all-games">Turn Average Duration All Games: {this.miliSecondsToTimeString(this.props.game.players[this.props.game.currentPlayerIndex].statistics.avgTurnsDurationsAllGames)}</div></td>
                            <td className="status-bar-td"><div id="single-card-count">Single Card Count: {this.props.game.players[this.props.game.currentPlayerIndex].statistics.singleCardCount}</div></td>
                            <td className="status-bar-td" width="200px"><div id="message">{this.props.game.message}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    
    miliSecondsToTimeString(timeInMiliSeconds) {
        var timeInSeconds = Math.round(timeInMiliSeconds / 1000);
        var seconds = Math.floor(timeInSeconds % 60)
        var minutes = Math.floor(timeInSeconds / 60);
        var hours = Math.floor(minutes / 60);
        return hours + ":" + minutes + ":" + seconds
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 10);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    // setInterval(render, 100);
};



