import React from 'react';

const CreateRoomModal = (props) => {

    const showHideClassName = props.show ? "create-room-modal display-block" : "create-room-modal display-none";
  

    return (
        <div className={showHideClassName}>
            <div>
                <form onSubmit={props.handleClose}>
                    <input className="gamename-input" name="gameName" />
                    <input className="totalPlayers-input" name="totalPlayers" />
                    <input className="create-game-btn btn" type="submit" value="Create Game" />
                </form>
            </div>
        </div>
    )
};

export default CreateRoomModal;

