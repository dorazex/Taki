import React from 'react';
import ReactDOM from 'react-dom';
import takiImage from '../images/superTaki.png';

export default class LoginModal extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            errMessage: ""
        }

        this.handleLogin = this.handleLogin.bind(this);
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
                if (userAlreadyOnlineInfo.alreadyOnline == true) {
                    this.setState(() => ({ errMessage: "" }));
                    if (this.timeoutId) {
                        clearTimeout(this.timeoutId);
                    }
                    this.props.loginSuccessHandler();
                }
            })
            .catch(err => { throw err });
    }

    render() {
        return (
            <div className="login-page-wrapper">
                <img className="taki-logo" src={takiImage} />
                <br />
                <br />
                <form onSubmit={this.handleLogin}>
                    <label className="username-label" htmlFor="userName">name:</label>
                    <input className="username-input" name="userName" />
                    <br />
                    <br />
                    <input className="submit-btn btn" type="submit" value="Login" />
                </form>
                <br />
                {this.renderErrorMessage()}
            </div>
        );
    }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return (
                <div className="login-error-message">
                    {this.state.errMessage}
                </div>
            );
        }
        return null;
    }

    handleLogin(e) {
        e.preventDefault();
        const userName = e.target.elements.userName.value;

        fetch('/users/addUser', { method: 'POST', body: userName, credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    if (!this.isCancelled) {
                        this.setState(() => ({ errMessage: "" }));
                        this.props.loginSuccessHandler();
                    }
                } else {
                    if (!this.isCancelled) {
                        if (response.status === 403) {
                            this.setState(() => ({ errMessage: "User name already exist, please try another one" }));
                        }
                        this.props.loginErrorHandler();
                    }
                }
            });
        return false;
    }
}