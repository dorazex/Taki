import React from 'react';
import * as utilities from '../models/utilities';

export default class StatusBarComp extends React.Component {
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 10);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { game, navigateMode } = this.props;
        return (
            <div id="statistics">
                <table className="status-bar">
                    <tbody>
                        <tr>
                            {navigateMode ? (
                                <td className="status-bar-td">
                                    <button id="new-game" onClick={this.props.newGame}>
                                        New Game!
                                </button>
                                </td>
                            ) : (
                                    <td className="status-bar-td">
                                        <button id="withdraw" onClick={this.props.withdraw}>
                                            Withdraw!
                                </button>
                                    </td>
                                )}
                            <td className="status-bar-td"><div id="turn"></div>Turn of: {this.props.game.players[this.props.game.currentPlayerIndex].isComputerPlayer == true ? "Computer" : "Human"}</td>
                            <td className="status-bar-td"><div id="color">{this.props.game.currentColor}</div></td>
                            <td className="status-bar-td"><div id="turns-count">Turns Count: {this.props.game.statistics.turnsCount}</div></td>
                            <td className="status-bar-td"><div id="game-duration">Game Duration: {utilities.miliSecondsToTimeString(this.props.game.statistics.getGameDuration())}</div></td>
                            <td className="status-bar-td"><div id="turn-average">Turn Average Duration: {utilities.miliSecondsToTimeString(this.props.game.players[this.props.game.currentPlayerIndex].statistics.avgTurnsDurationsCurrentGame)}</div></td>
                            <td className="status-bar-td"><div id="turn-average-all-games">Turn Average Duration All Games: {utilities.miliSecondsToTimeString(this.props.game.players[this.props.game.currentPlayerIndex].statistics.avgTurnsDurationsAllGames)}</div></td>
                            <td className="status-bar-td"><div id="single-card-count">Single Card Count: {this.props.game.players[this.props.game.currentPlayerIndex].statistics.singleCardCount}</div></td>
                            <td className="status-bar-td" width="200px"><div id="message">{this.props.game.message}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};



