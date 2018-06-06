import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css';

const CardComp = (props) => {
    const onClick = (event) => {
        console.log("card onClick")
        if (props.game.players[props.playerKey].isComputerPlayer == true){
            return
        }
        if (props.game.navigateMode == false) {
            if (props.card.action == "changeColor") {
                props.colorChosen(props.card, props.cardKey, props.playerKey);
            } else {

                props.cardClicked(props.card, props.cardKey, props.playerKey);
            }
        }
    };

    return (
        <div className="card-container" onClick={(e) => onClick(e)}>
            {
                props.player.isComputerPlayer == false ?
                    <img src={`cards/${props.card.getFileName()}`} style={{ cursor: "pointer" }} /> :
                    <img src="cards/cover_0_0.png" className="disabled-regular" />
            }
        </div>
    )
};

export default CardComp;