import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';

import Header from './Header';
import Footer from './Footer';
import LayoutWithSidebar from './LayoutWithSidebar';

import './Layout.css';

export const Layout = (props) => {
    const contentClass = `layout__content ${!props.header && 'layout__content--no-header'}`;
    const { sidebar } = props;

    return (
        <>
            {props.header ? <Header title={props.title} /> : null}
            <BootstrapContainer className={contentClass}>
                {sidebar && !!sidebar.location ? (
                    <LayoutWithSidebar sidebar={sidebar}>{props.children}</LayoutWithSidebar>
                ) : (
                    props.children
                )}
            </BootstrapContainer>
            {props.footer ? <Footer /> : null}
        </>
    );
};
