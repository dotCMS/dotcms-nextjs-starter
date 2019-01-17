import React, { Component } from 'react';
import { Nav as BootstrapNav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import DotCMSApi from '../libs/dotcms.api';

export default class Nav extends Component {
    state = {
        collapsed: false,
        showLogin: false,
        items: []
    };

    async componentDidMount() {
        DotCMSApi.request({
            url: '/api/v1/nav//?depth=2'
        })
            .then(response => response.json())
            .then(data => data.entity.children)
            .then(data => {
                this.setState({
                    ...this.state,
                    items: data
                });
            });
    }

    toggleCollapsed = e => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        });
    };

    toggleLogin = e => {
        this.setState({
            ...this.state,
            showLogin: !this.state.showLogin
        });
    };

    render() {
        return (
            <>
                <NavbarToggler onClick={this.toggleCollapsed} />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <BootstrapNav pills={true}>
                        {this.state.items.map(item => {
                            return (
                                <NavItem key={item.folder}>
                                    <NavLink tag={Link} active={item.href === window.location.pathname} to={item.href}>
                                        {item.title}
                                    </NavLink>
                                </NavItem>
                            );
                        })}
                    </BootstrapNav>
                </Collapse>
            </>
        );
    }
}
