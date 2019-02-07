import React, { Component } from 'react';
import { Nav as BootstrapNav, NavbarToggler, Collapse } from 'reactstrap';
import DotCMSApi from '../../libs/dotcms.api';
import PageContext from '../../PageContext';
import NavOption from '../../Components/Nav/NavOption';
import NavDropDown from './NavDropDown';
import NavSort from './NavSort';
import './Nav.css';

export default class Nav extends Component {
    static contextType = PageContext;
    state = {
        collapsed: false,
        showLogin: false,
        items: []
    };

    componentDidMount() {
        DotCMSApi.request({
            url: `${process.env.REACT_APP_DOTCMS_HOST}/api/v1/nav//?depth=3`
        })
            .then(response => response.json())
            .then(data => data.entity.children)
            .then(data => {
                this.setState({
                    ...this.state,
                    items: data
                });
            })
            .catch(e => console.error(`.catch(${e})`));
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
        const isEditModeFromDotCMS = this.context && this.context.mode && this.context.mode === 'EDIT_MODE';
        const remoteRendered = this.context && this.context.page && this.context.page.remoteRendered;

        return (
            <>
                {remoteRendered && isEditModeFromDotCMS ? (<NavSort></NavSort>) : ''}
                <NavbarToggler className="nav-menu__toggle-button" onClick={this.toggleCollapsed} >&#9776;</NavbarToggler>
                <Collapse className="nav-menu__links" isOpen={this.state.collapsed} navbar>
                    <BootstrapNav>
                        {this.state.items.map((item) => {
                            if (item.children.length && item.type === 'folder') {
                                return <NavDropDown key={item.hash} options={item} />;
                            } else {
                                return <NavOption key={item.hash} item={item} />;
                            }
                        })}
                    </BootstrapNav>
                </Collapse>
            </>
        );
    }
}
