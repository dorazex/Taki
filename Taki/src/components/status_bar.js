import React from 'react';
import Validations from '../models/utilities';

export default class StatusBarComp extends React.Component {
    render() {
        const { game } = this.props;
        return (
            <div id="statistics">
                <table className="status-bar">
                    <tbody>
                        <tr>
                            <td className="status-bar-td">
                                <button id="withdraw" onClick={game.withdraw}>
                                    Withdraw!
                                </button>
                            </td>
                            <td className="status-bar-td"><div id="turn"></div></td>
                            <td className="status-bar-td"><div id="color"></div></td>
                            <td className="status-bar-td"><div id="turns-count">0</div></td>
                            <td className="status-bar-td"><div id="game-duration">0</div></td>
                            <td className="status-bar-td"><div id="turn-average">0</div></td>
                            <td className="status-bar-td"><div id="turn-average-all-games">0</div></td>
                            <td className="status-bar-td"><div id="single-card-count">0</div></td>
                            <td className="status-bar-td" width="200px"><div id="message"></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 10);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    // setInterval(render, 100);
};



