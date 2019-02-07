import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

import './Layout.css'

const Layout = (props) => {
    const contentClass = `layout__content ${!props.header && 'layout__content--no-header'}`

    return (
        <>
            {props.header ? <Header title={props.title} /> : null}
            <BootstrapContainer className={contentClass}>{props.children}</BootstrapContainer>
            {props.footer ? <Footer /> : null}
        </>
    );
};

export default Layout;
