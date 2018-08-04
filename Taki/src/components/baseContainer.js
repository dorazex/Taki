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
            createErrMessage: "",
            cancelled: false,
            currentUser: {
                name: ''
            }
        };

        this.createRoomHandler = this.createRoomHandler.bind(this);
        this.enterRoomHandler = this.enterRoomHandler.bind(this);
        this.deleteRoomHandler = this.deleteRoomHandler.bind(this);
        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.hideCreateRoomModal = this.hideCreateRoomModal.bind(this);
        this.handleSelectedRoom = this.handleSelectedRoom.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);

        this.getUserName();
    }

    render() {
        if (this.state.show == 'login') {
            return (<LoginModal loginSuccessHandler={this.handleSuccessedLogin} loginErrorHandler={this.handleLoginError} />)
        }
        else if (this.state.show == 'rooms')
            return this.renderRooms();
        else if (this.state.show == 'game') {
            return (<GameComp username={this.state.currentUser.name} userWithdraw={this.handleWithdraw} />);
        }
    }

    handleSelectedRoom(roomIdentifier) {
        this.setState({ selectedRoom: roomIdentifier });
    }


    handleWithdraw() {
        fetch('/game/withdraw', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState(() => ({ show: 'rooms' }));
                }
            })
    }

    handleSuccessedLogin() {
        this.setState(() => ({ showLogin: 'rooms' }), this.getUserName);
    }

    handleLoginError() {
        console.error('login failed')
        this.setState(() => { showLogin: true });
    }

    deleteRoomHandler() {
        if (this.state.selectedRoom != undefined) {
            fetch('/rooms/deleteRoom', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomid: this.state.selectedRoom }),
                credentials: 'include'
            })
                .then((response) => {
                    if (response.status === 403) {
                        response.json().then((res) => {
                            this.setState({ errMessage: res.message });
                        })
                    }
                })
        }
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
        const withComputer = e.target.elements.computer.checked;

        fetch('/rooms/createGame', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameTitle: gameTitle,
                totalPlayers: totalPlayers,
                withComputer: withComputer
            }),
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 403 || response.status === 200) {
                    return response.json();
                }
            })
            .then((res) => {
                if (res.message) {
                    this.setState({ createErrMessage: res.message, showCreateRoomModal: true });
                } else {
                    this.setState({ createErrMessage: '', showCreateRoomModal: false });
                }
            });
    };

    createRoomHandler() {
        this.setState({ showCreateRoomModal: true });
    };

    handleCancel() {
        this.setState({ createErrMessage: '', showCreateRoomModal: false });
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
                                <td className="user-info-area-td">
                                    <button className="deleteroom" onClick={this.deleteRoomHandler}>Delete Room</button>
                                </td>
                                <td>
                                    {this.renderErrorMessage()}
                                </td>
                                <td className="user-info-area-td-last">
                                    <button className="logout" onClick={this.logoutHandler}>Logout</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <RoomsContainer selectedRoomHandler={this.handleSelectedRoom} selected={this.state.selectedRoom} />
                <CreateRoomModal show={this.state.showCreateRoomModal} handleClose={this.hideCreateRoomModal} errMessage={this.state.createErrMessage} handleCancel={this.handleCancel} />
            </div>
        )
    }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return (
                <div className="base-container-err-message">
                    {this.state.errMessage}
                </div>
            );
        }
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

    logoutHandler() {
        fetch('/users/logout', { method: 'GET', credentials: 'include' })
            .then((response) => {
                if (response.status === 200) {
                    this.setState(() => ({ currentUser: { name: '' }, show: 'login' }));
                } else if (response.status === 403) {
                    response.json().then((res) => {
                        this.setState({ errMessage: res.message });
                    })
                }
            })
    }
}