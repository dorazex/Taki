import React from 'react';
import DecksComp from './decks';
import PlayerComp from './player';
import '../style.css';

export default class BoardComp extends React.Component{
    render() {
        const { game, cardClicked, colorChosen } = this.props;

        return (
                <div>
                    <div id="board" className="board-flex-container">
                        <DecksComp game={game} open={false} finishTurn={this.props.finishTurn} pullCard={this.props.pullCard}/>
                        <DecksComp game={game} open={true} />
                    </div>
                    <div id="players">
                        {game.players.map(
                            (player, i) => <PlayerComp
                             key={i} 
                             playerKey={i} 
                             player={player} 
                             game={game}
                             cardClicked={cardClicked}
                             colorChosen={colorChosen}
                             />)}
                    </div>
                </div>
        )
    };
}

