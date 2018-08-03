import React from 'react';
import ReactDOM from 'react-dom';

export default class Rooms extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            content: [],
        };

        this.getRoomsContent = this.getRoomsContent.bind(this);
    }

    componentDidMount() {
        this.getRoomsContent();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.isCancelled = true;
    }

    render() {
        return (
            <div className="rooms-wrapper">
                <label className="table-top-label">Rooms</label>
                <br /><br />
                <table className="rooms-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Organizer</th>
                            <th>Players</th>
                            <th>Game Started</th>
                        </tr>
                    </thead>
                    <tbody id="roomslist">
                        {this.state.content.map((line, index) => (
                            <tr key={line.roomIdentifier} id={line.roomIdentifier} onClick={(e) => this.props.selectedRoomHandler(line.roomIdentifier)} className={line.roomIdentifier == this.props.selected ? 'table-info' : null}>
                                <td>
                                    {line.gameTitle}
                                </td>
                                <td>
                                    {line.organizer}
                                </td>
                                <td>
                                    {line.onlinePlayers}/{line.totalPlayers}
                                </td>
                                <td>
                                    {line.startGame == true ? 'Yes' : 'No'}
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        )
    }

    getRoomsContent() {
        return fetch('/rooms/roomList', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getRoomsContent, 200);
                return response.json();
            })
            .then(content => {
                if (!this.isCancelled) {
                    this.setState(() => ({ content }));
                }
            })
            .catch(err => { throw err });
    }
}