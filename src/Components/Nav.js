import React, { Component } from "react";
import {
    Nav as BootstrapNav,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from "reactstrap";
import DotCMSApi from "../libs/dotcms.api";
import NavOption from "./NavOption";

export default class Nav extends Component {
    state = {
        collapsed: false,
        showLogin: false,
        items: []
    };

    async componentDidMount() {
        DotCMSApi.request({
            url: `${process.env.REACT_APP_DOTCMS_HOST}/api/v1/nav//?depth=3`
        })
            .then(response => response.json())
            .then(data => data.entity.children)
            .then(data => {
                this.setState({
                    ...this.state,
                    collapsed: !this.state.collapsed,
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
        return (
            <>
                <NavbarToggler onClick={this.toggleCollapsed} />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <BootstrapNav pills={true}>
                        {this.state.items.map(item => {
                            if (item.children.length && item.type === 'folder'){
                                return(  <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {item.title}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {item.children.map( subItem => {
                                                return (
                                                    <DropdownItem>
                                                        <NavOption item={subItem}/>
                                                    </DropdownItem>
                                                )
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )
                            }else{
                                return(<NavOption item={item}/>)
                            }
                        })}
                    </BootstrapNav>
                </Collapse>
            </>
        );
    }
}
