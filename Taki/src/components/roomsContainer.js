import React from 'react';
import ReactDOM from 'react-dom';
import Rooms from './rooms.js';
import Players from './players.js';


export default class RoomsContainer extends React.Component {
    constructor(args) {
        super(...args);

        this.checkUserAlreadyOnline = this.checkUserAlreadyOnline.bind(this);
    }

    componentDidMount() {
        this.checkUserAlreadyOnline();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.isCancelled = true;
    }

    checkUserAlreadyOnline() {
        return fetch('/users/checkUserAlreadyOnline', { method: 'GET', credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                this.timeoutId = setTimeout(this.checkUserAlreadyOnline, 200);
                return response.json();
            })
            .then(userAlreadyOnlineInfo => {
                if (userAlreadyOnlineInfo.alreadyOnline == false && !this.isCancelled) {
                    if (this.timeoutId) {
                        clearTimeout(this.timeoutId);
                    }
                    this.props.loginErrorHandler();
                }
            })
            .catch(err => { throw err });
    }

    render() {
        return (
            <div className="players-rooms-row">
                <Players className="players-view"/>
                <Rooms className="rooms-view" selectedRoomHandler={this.props.selectedRoomHandler} selected={this.props.selected} />
            </div>
        )
    }
}







