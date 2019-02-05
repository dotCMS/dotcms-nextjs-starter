import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';
import Header from './Header';

const Layout = (props) => {
    return (
        <>
            <Header title={props.title} />
            <BootstrapContainer className="layout__content">{props.children}</BootstrapContainer>
        </>
    );
};

export default Layout;
