import React from 'react';
import ReactDOM from 'react-dom';
import Rooms from './rooms.js';
import Players from './players.js';


const RoomsContainer = (props) => {
    return (
        <div className="players-rooms-row">
            <Players className="players-view"/>
            <Rooms className="rooms-view" selectedRoomHandler={props.selectedRoomHandler} selected={props.selected} />
        </div>
    )
};

export default RoomsContainer;