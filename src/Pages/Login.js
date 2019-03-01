import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import './Login.css';

import dotcmsApi from '../dotcmsApi';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            auth: false
        };
    }

    render() {
        return this.state.auth || dotcmsApi.auth.isLogin() ? (
            <Redirect to="/about-us" />
        ) : (
            <div className="wrapper">
                <LoginForm
                    onSubmit={({ user, password }) => {
                        dotcmsApi.auth.login({ user, password }).then(() => {
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

