import React from 'react';
import ReactDOM from 'react-dom';
import ChangeColorComp from './change_color';
import '../style.css';

export default class CardComp extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            cardKey: props.cardKey,
            card: props.card,
            player: props.player,
            game: props.game,
            playerKey: props.playerKey,
            changeColor: false,
        }
        this.onClick = this.onClick.bind(this);
        this.colorChosen = this.colorChosen.bind(this);
    }

    onClick(event){

        console.log("card onClick")
        if (this.state.card.action == "changeColor"){
            this.state.changeColor = true;
        } else {
            this.state.changeColor = false;
            this.props.cardClicked(this.props);
        }
        this.setState(this.state);
    };

    colorChosen(color){      
        this.state.changeColor = false;
        this.setState(this.state);
        const { card, player } = this.props;
        this.props.onColorChoosed(color, card, player);     
    }

    render (){
        const { cardKey, card, player, game } = this.state;
        return(
            <div className="card-container" onClick={player.isComputerPlayer == false ? (e) => this.onClick(e) : ""}>
                        {
                            player.isComputerPlayer == false ?
                                <img src={`cards/${card.getFileName()}`} style={{cursor: "pointer"}} /> :
                                <img src="cards/cover_0_0.png"/>
                        }
            </div>
        )
    }
}
