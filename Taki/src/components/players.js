import React from 'react';
import ReactDOM from 'react-dom';

export default class Players extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            content: [],
        };

        this.getPlayersContent = this.getPlayersContent.bind(this);

        this.getPlayersContent();
    }

    // componentDidMount() {
    //     this.getPlayersContent();
    // }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render() {
        return (
            <div className="players-wrapper">
                <label className="table-top-label">Players</label>
                <br/><br/>
                <table className="players-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody id="userslist">
                        {
                            this.state.content.map((line, index) => {
                                return (
                                    <tr key={index}>
                                        <td key={index}>
                                            {line.name}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    getPlayersContent() {
        return fetch('/rooms/userList', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getPlayersContent, 200);
                return response.json();
            })
            .then(content => {
                this.setState(() => ({ content }));
            })
            .catch(err => { throw err });
    }
}