import React, { Component } from 'react';
import { Nav as BootstrapNav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    state = {
        isOpen: false,
        items: []
    };

    async componentDidMount() {
        fetch('/api/v1/nav//?depth=2', {
            headers: {
                DOTAUTH: Buffer.from(
                    `${process.env.REACT_APP_USER_EMAIL}:${process.env.REACT_APP_USER_PASSWORD}`
                ).toString('base64')
            }
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

    toggleOpen = e => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <>
                <NavbarToggler onClick={this.toggleOpen} />
                <Collapse isOpen={this.state.isOpen} navbar>
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
