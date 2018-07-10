import React from 'react';
import coverCardImage from '../cards/cover_0_0.png';



export default class DecksComp extends React.Component {
    getFileName(number, color, action) {
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



    render() {
        if (this.props.open == false) {
            return (
                <div className={"deck-container"}>
                    <div id="deck" onClick={this.props.pullCard}>
                        <img src={coverCardImage}  style={this.props.username == this.props.currentPlayerName ? { cursor: "pointer" } : {}} />
                    </div>
                    <div id="deck-text" className="deck-text">
                        {this.props.numberOfCards}
                    </div>
                    <div>
                        <button id="finish-turn"
                            style={{ visibility: ((this.props.username == this.props.currentPlayerName) && (this.props.currentAction != undefined) && (this.props.currentAction == "taki" || this.props.currentAction == "superTaki")) ? 'visible' : 'hidden' }}
                            className="deck-finish-turn-button"
                            onClick={this.props.finishTurn} />
                    </div>
                </div>
            );
        } else {
            return (
                <div id="open-deck">
                  <img src={require(`../cards/${this.getFileName(this.props.topCard.number, this.props.topCard.color, this.props.topCard.action)}`)}  /> 
                </div>
            );
        }
    }
}

