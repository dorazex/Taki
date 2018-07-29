import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css';
import coverCardImage from '../cards/cover_0_0.png';

const CardComp = (props) => {
	const getFileName = (number, color, action) => {
		var text = "";
		if (null != action) {
			text += action.toString();
		} else {
			text += "0";
		}
		text += "_";

		if (null != number) {
			text += number.toString();
		} else {
			text += "0";
		}
		text += "_";

		if (null != color) {
			text += color.toString();
		} else {
			text += "0";
		}
		text += ".png";

		return text;
	}

	const onClick = (event) => {
		if (props.currentPlayerName != props.username || !props.gameRunning)
			return;

		if (props.card.action == "changeColor") {
			props.colorChosen(props.card, props.cardKey, props.playerKey);
		} else {
			props.cardClicked(props.card, props.cardKey, props.playerKey);
		}
	};

	return (
		<div className="card-container">
			{
				props.username == props.player.name ?
					<img src={require(`../cards/${getFileName(props.card.number, props.card.color, props.card.action)}`)} style={(props.username == props.currentPlayerName) && (props.gameRunning) ? { cursor: "pointer" } : {}} onClick={(e) => onClick(e)} /> :
					<img src={coverCardImage} className="disabled-regular" />
			}
		</div>
	)
};

export default CardComp;