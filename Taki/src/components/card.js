import React from 'react';
import ReactDOM from 'react-dom';
import ChangeColorComp from './change_color';
import '../style.css';

export default class CardComp extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(event){
        console.log("card onClick")
        if (this.props.card.action == "changeColor"){
            this.props.colorChosen(this.props.card, this.props.cardKey, this.props.playerKey);
        } else {
           
            this.props.cardClicked(this.props.card, this.props.cardKey, this.props.playerKey);
        }
    };

    colorChosen(color){      
        this.state.changeColor = false;
        this.setState(this.state);
        const { card, player } = this.props;
        this.props.onColorChoosed(color, card, player);     
    }

    render (){
        return(
            <div className="card-container" onClick={(e) => this.onClick(e)}>
                        {
                            this.props.player.isComputerPlayer == false ?
                                <img src={`cards/${this.props.card.getFileName()}`} style={{cursor: "pointer"}} /> :
                                <img src={`cards/${this.props.card.getFileName()}`} /> 
                                //<img src="cards/cover_0_0.png"/>
                        }
            </div>
        )
    }
}
