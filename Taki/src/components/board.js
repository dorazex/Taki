import React from 'react';
import DecksComp from './decks';
import CardsComp from './cards';

export default class BoardComp extends React.Component{
    render() {
        const { game } = this.props;
        return (<div id="game" className="game-flex" >
            <div id="board" className="board-flex-container">
                <DecksComp game={game} />
            </div>
        </div>)
    };
}