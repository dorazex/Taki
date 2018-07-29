import React from 'react';

const CreateRoomModal = (props) => {

// && !props.cancelled

    const showHideClassName = (props.show) ? "create-room-modal display-block" : "create-room-modal display-none";
    const createErrMessage = props.errMessage;
  

    return (
        <div className={showHideClassName}>
            <div className="create-room-form-div">
                <form onSubmit={props.handleClose}>
                    <div className="create-room-modal-name-div">
                        <label className="create-room-form-label">Room Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input className="gamename-input" name="gameName" />
                        <br/><br/>
                    </div>
                    <div className="create-room-modal-players-div">
                        <label className="create-room-form-label">Total Players:&nbsp;</label>
                        <input className="totalPlayers-input" name="totalPlayers" />
                        <br/><br/>
                    </div>
                    <div className="create-room-modal-buttons-div">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td width="50%" padding="2%">
                                        <input className="create-game-btn btn" type="submit" value="Create Room" />
                                    </td>
                                    <td width="50%" padding="2%">
                                        <button className="create-room-close-button" type="button" onClick={props.handleCancel}>Close</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <div className="create-room-modal-message-div">
                        {createErrMessage}
                    </div>
                </form>
            </div>
        </div>
    )
};

export default CreateRoomModal;

