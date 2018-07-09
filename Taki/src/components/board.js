import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';
import '../style.css';

export default class BoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            players: [],
        };

        this.getPlayersContent = this.getPlayersContent.bind(this);
    }

    componentDidMount() {
        this.getPlayersContent();
    }

    // <DecksComp open={false} finishTurn={this.props.finishTurn} pullCard={this.props.pullCard} />
    // <DecksComp open={true} />

    render() {
        return (
            <div>
                <div id="board" className="board-flex-container">
                 
                </div>
                <div id="players">
                    {this.state.players.map(
                        (player, i) => <PlayerComp
                            key={i}
                            playerKey={i}
                            player={player}
                            cardClicked={this.props.cardClicked}
                            colorChosen={this.props.colorChosen}
                            username={this.props.username}
                        />)}
                </div>
            </div>
        )
    }

    getPlayersContent() {
        return fetch('/game/players', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getPlayersContent, 200);
                return response.json();
            })
            .then(players => {
                this.setState(() => ({ players }));
            })
            .catch(err => { throw err });
    }
}


