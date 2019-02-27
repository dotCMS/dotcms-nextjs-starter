import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import './Login.css';

import dotCMSApi from '../dotcmsApi';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            auth: false
        };
    }

    render() {
        return this.state.auth || dotCMSApi.auth.isLogin() ? (
            <Redirect to="/about-us" />
        ) : (
            <div className="wrapper">
                <LoginForm
                    onSubmit={({ user, password }) => {
                        dotCMSApi.auth.login({ user, password }).then(() => {
                            this.setState({
                                auth: true
                            });
                        });
                    }}
                />
            </div>
        );
    }
}

