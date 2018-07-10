import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';
import '../style.css';

export default class BoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            board: {
                players: [],
                numberOfCards: undefined,
                currentAction: undefined,
                topCard: {
                    number: null,
                    color: null,
                    action: 'superTaki',
                }
            },
        };

        this.getBoardContent = this.getBoardContent.bind(this);
    }

    componentDidMount() {
        this.getBoardContent();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render() {
        return (
            <div>
                <div id="board" className="board-flex-container">
                    <DecksComp open={false} numberOfCards={this.state.board.numberOfCards} currentAction={this.state.board.currentAction} finishTurn={this.props.finishTurn} pullCard={this.props.pullCard} />
                    <DecksComp open={true} topCard={this.state.board.topCard} />
                </div>
                <div id="players">
                    {this.state.board.players.map(
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



    getBoardContent() {
        return fetch('/game/boardInfo', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.getBoardContent, 200);
                return response.json();
            })
            .then(boardInfo => {
                this.setState(() => ({ board: boardInfo }));
            })
            .catch(err => { throw err });
    }
}


