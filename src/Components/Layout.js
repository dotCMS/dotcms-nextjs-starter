import React from 'react';

import { Container as BootstrapContainer } from 'reactstrap';

import Header from './Header';

const Layout = props => {
    return (
        <>
            <Header />
            <BootstrapContainer>
                {props.children}
            </BootstrapContainer>
        </>
    );
};

export default Layout;
