import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';
import '../style.css';

export default class BoardComp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            board: {
                gameRunning: false,
                players: [],
                numberOfCards: undefined,
                currentAction: undefined,
                currentPlayerName: undefined,
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

        this.isCancelled = true;
    }

    render() {
        return (
            <div>
                <div id="board" className="board-flex-container">
                    <DecksComp open={false} gameRunning={this.state.board.gameRunning} username={this.props.username} currentPlayerName={this.state.board.currentPlayerName} numberOfCards={this.state.board.numberOfCards} currentAction={this.state.board.currentAction} finishTurn={this.props.finishTurn} pullCard={this.props.pullCard} />
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
                            currentPlayerName={this.state.board.currentPlayerName}
                            username={this.props.username}
                            gameRunning={this.state.board.gameRunning}
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
                if (!this.isCancelled) {
                    this.setState(() => ({ board: boardInfo }));
                }
            })
            .catch(err => { throw err });
    }
}


