import React from 'react';

export default class ChangeColorComp extends React.Component {
    constructor(props) {
        super(...props);

        this.state = {
            game: props.game,
            visible: props.visible
        }
    }

    render(){
        const { game, visible } = this.state;
        if (visible){
            return(
                <div id="change-color-modal" className="modal">
                    <div className="change-color-modal-content">
                        <table width="100%" height="100%">
                            <tr>
                                <td id="yellow" onClick={game.changeColor("yellow")} />
                                <td id="red" onClick={game.changeColor("red")} />
                            </tr>
                            <tr>
                                <td id="blue" onClick={game.changeColor("blue")} />
                                <td  id="green" onClick={game.changeColor("green")} />
                            </tr>
                        </table>
                    </div>
                </div>
            ) 
        } else {
            return "";
        }
    }
}
