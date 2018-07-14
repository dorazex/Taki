import React from 'react';
import ReactDOM from 'react-dom';
import Rooms from './rooms.js';
import Players from './players.js';


const RoomsContainer = (props) => {
    return (
        <div className="row">
            <Players className="players-view"  style="display: inline-block;" />
            <Rooms className="rooms-view" style="float: left;" selectedRoomHandler={props.selectedRoomHandler} selected={props.selected} />
        </div>
    )

};

export default RoomsContainer;