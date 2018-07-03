import React from 'react';
import ReactDOM from 'react-dom';
import Rooms from './rooms.js';
import Players from './players.js';


const RoomsContainer = (props) => {
    return (
        <div className="row">
            <Players className="col-md-3" />
            <Rooms className="col-md-9" selectedRoomHandler={props.selectedRoomHandler} selected={props.selected} />
        </div>
    )

};

export default RoomsContainer;