import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.js';
import RoomsContainer from './roomsContainer.js';
import CreateRoomModal from './createRoomModal.js';

export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            show: 'login',  //login, rooms, game
            selectedRoom: undefined,
            showCreateRoomModal: false,
            currentUser: {
                name: ''
            }
        };


        this.createRoomHandler = this.createRoomHandler.bind(this);
        this.enterRoomHandler = this.enterRoomHandler.bind(this);
        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.hideCreateRoomModal = this.hideCreateRoomModal.bind(this);
        this.handleSelectedRoom = this.handleSelectedRoom.bind(this);


        //this.logoutHandler= this.logoutHandler.bind(this);

        this.getUserName();
    }

    render() {
        if (this.state.show == 'login') {
            return (<LoginModal loginSuccessHandler={this.handleSuccessedLogin} loginErrorHandler={this.handleLoginError} />)
        }
        else if (this.state.show == 'rooms')
            return this.renderRooms();
    }

    handleSelectedRoom(roomIdentifier) {
        this.setState({ selectedRoom: roomIdentifier });
       
    }


    handleSuccessedLogin() {
        this.setState(() => ({ showLogin: 'rooms' }), this.getUserName);
    }

    handleLoginError() {
        console.error('login failed')
        this.setState(() => { showLogin: true });
    }


    enterRoomHandler() {
        

    }

    hideCreateRoomModal(e) {
        e.preventDefault();
        const gameTitle = e.target.elements.gameName.value;
        const totalPlayers = e.target.elements.totalPlayers.value;

        fetch('/rooms/createGame', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameTitle: gameTitle,
                totalPlayers: totalPlayers,
                organizer: this.state.currentUser.name
            }),
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
            })
            .catch(err => { throw err });

        this.setState({ showCreateRoomModal: false });
    };

    createRoomHandler() {
        this.setState({ showCreateRoomModal: true });
    };

    renderRooms() {
        return (
            <div className="rooms-container">
                <div className="user-info-area">
                    Hello {this.state.currentUser.name}
                    <button className="logout btn" onClick={this.logoutHandler}>Logout</button>
                    <button className="createroom btn" onClick={this.createRoomHandler}>Create Room</button>
                    <button className="enterroom btn" onClick={this.enterRoomHandler}>Enter Room</button>
                </div>
                <RoomsContainer selectedRoomHandler={this.handleSelectedRoom} selected = {this.state.selectedRoom}/>
                <CreateRoomModal show={this.state.showCreateRoomModal} handleClose={this.hideCreateRoomModal} />
            </div>
        )
    }

    getUserName() {
        this.fetchUserInfo()
            .then(userInfo => {
                console.log("hereww " + userInfo)
                this.setState(() => ({ currentUser: userInfo, show: 'rooms' }));
            })
            .catch(err => {
                if (err.status === 401) { // incase we're getting 'unautorithed' as response
                    this.setState(() => ({ showLogin: true }));
                } else {
                    throw err; // in case we're getting an error
                }
            });
    }

    fetchUserInfo() {
        return fetch('/users', { method: 'GET', credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            });
    }

    // logoutHandler() {
    //     fetch('/rooms/logout', {method: 'GET', credentials: 'include'})
    //     .then(response => {
    //         if (!response.ok) {
    //             console.log(`failed to logout user ${this.state.currentUser.name} `, response);                
    //         }
    //         this.setState(()=>({currentUser: {name:''}, showLogin: true}));
    //     })
    // }
}