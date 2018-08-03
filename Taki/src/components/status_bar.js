import React from 'react';
import * as utilities from '../models/utilities';

export default class StatusBarComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            status: {
                turnOf: undefined,
                currentColor: undefined,
                turnsCount: undefined,
                gameDuration: 0,
                avgTurnsDurationsCurrentGame: 0,
                singleCardCount: undefined,
                message: undefined,
                isWin: false
            }
        };

        this.getStatusGame = this.getStatusGame.bind(this);
    }


    componentDidMount() {
        this.getStatusGame();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render() {
        var gameDuration = this.state.status.gameDuration;
        if (gameDuration > 0 && gameDuration < 1000) {
            return (
                <div id="statistics">
                    <table className="status-bar notification">
                        <tbody>
                            <tr>
                                <td className="status-bar-td">
                                    GAME HAS STARTED
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

        return (
            <div id="statistics">
                <table className="status-bar">
                    <tbody>
                        <tr>
                            {(this.state.status.gameRunning == false || this.state.status.isWin == true) &&
                                <td className="status-bar-td">
                                    <button id="withdraw" onClick={this.props.withdraw}>
                                        Withdraw!
                                </button>
                                </td>
                            }
                            <td className="status-bar-td"><div id="turn"></div>Turn of: {this.state.status.turnOf}</td>
                            <td className="status-bar-td"><div id="color">{this.state.status.currentColor}</div></td>
                            <td className="status-bar-td"><div id="turns-count">Turns Count: {this.state.status.turnsCount}</div></td>
                            <td className="status-bar-td"><div id="game-duration">Game Duration: {utilities.miliSecondsToTimeString(this.state.status.gameDuration)}</div></td>
                            <td className="status-bar-td"><div id="turn-average">Turn Average Duration: {utilities.miliSecondsToTimeString(this.state.status.avgTurnsDurationsCurrentGame)}</div></td>
                            <td className="status-bar-td"><div id="single-card-count">Single Card Count: {this.state.status.singleCardCount}</div></td>
                            <td className="status-bar-td" width="200px"><div id="message">{this.state.status.message}</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    getStatusGame() {
        return fetch('/game/statusGame', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getStatusGame, 200);
                return response.json();
            })
            .then(statusInfo => {
                this.setState(() => ({ status: statusInfo }));
            })
            .catch(err => { throw err });
    }
};



