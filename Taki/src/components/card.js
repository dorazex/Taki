import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css';

const CardComp = (props) => {
    const onClick = (event) => {
        if (props.game.players[props.playerKey].isComputerPlayer == true) {
            return;
        }

        if (props.card.action == "changeColor") {
            props.colorChosen(props.card, props.cardKey, props.playerKey);
        } else {
            props.cardClicked(props.card, props.cardKey, props.playerKey);
        }
    };

    return (
        <div className="card-container" onClick={(e) => onClick(e)}>
            {
                props.player.isComputerPlayer == false ?
                    <img src={`../src/cards/${props.card.getFileName()}`} style={{ cursor: "pointer" }} /> :
                    <img src="../src/cards/cover_0_0.png" className="disabled-regular" />
            }
        </div>
    )
};

export default CardComp;