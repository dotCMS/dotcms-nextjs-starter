import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import './Login.css';
import DotCMSApi from '../libs/dotcms.api';
import LoginForm from '../Components/LoginForm';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            auth: false
        };
    }

    render() {
        return this.state.auth || DotCMSApi.auth.isLogin() ? (
            <Redirect to="/about-us" />
        ) : (
            <div className="wrapper">
                <LoginForm
                    onSubmit={({ user, password }) => {
                        DotCMSApi.auth.login({ user, password }).then(() => {
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

