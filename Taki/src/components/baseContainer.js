import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.js';
import RoomsContainer from './roomsContainer.js';
import CreateRoomModal from './createRoomModal.js';
import GameComp from './game.js';

export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            show: 'login',  //login, rooms, game
            selectedRoom: undefined,
            showCreateRoomModal: false,
            errMessage: "",
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
        else if (this.state.show == 'game') {
            return (<GameComp username={this.state.currentUser.name}/>);
        }
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
        if (this.state.selectedRoom != undefined) {
            fetch('/rooms/enterRoom', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomid: this.state.selectedRoom }),
                credentials: 'include'
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState(() => ({ show: 'game' }));
                    } else if (response.status === 403) {
                        response.json().then((res) => {
                            console.log(res.message)
                            // this.state.errMessage = res.message;
                            this.setState({ errMessage: res.message });
                        })
                    }
                })
        }
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
                totalPlayers: totalPlayers
            }),
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 403) {
                    return response.json();
                }
            })
            .then((res) => {
                console.log(res.message)
            });

        this.setState({ showCreateRoomModal: false });
    };

    createRoomHandler() {
        this.setState({ showCreateRoomModal: true });
    };

    renderRooms() {
        return (
            <div className="rooms-container">
                <div className="user-info-area">
                    <table>
                        <tbody>
                            <tr>
                                <td className="user-info-area-td">
                                    Hello {this.state.currentUser.name}
                                </td>
                                <td className="user-info-area-td">
                                    <button className="createroom" onClick={this.createRoomHandler}>Create Room</button>
                                </td>
                                <td className="user-info-area-td">
                                    <button className="enterroom" onClick={this.enterRoomHandler}>Enter Room</button>
                                </td>
                                <td className="user-info-area-td-last">
                                    <button className="logout" onClick={this.logoutHandler}>Logout</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <RoomsContainer selectedRoomHandler={this.handleSelectedRoom} selected={this.state.selectedRoom} />
                <CreateRoomModal show={this.state.showCreateRoomModal} handleClose={this.hideCreateRoomModal} />
                {this.renderErrorMessage()}
            </div>
        )
    }


    renderErrorMessage() {
        console.log("renderErrorMessage")
        if (this.state.errMessage) {
            console.log("renderErrorMessage - inside if")
            return (
                <div className="base-container-err-message">
                    {this.state.errMessage}
                </div>
            );
        }
        console.log("renderErrorMessage - outside if")
        return null;
    }


    getUserName() {
        this.fetchUserInfo()
            .then(userInfo => {
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