import React from 'react';
import {
    Container as BootstrapContainer,
    Row as BootstrapRow,
    Col as BootstrapCol
} from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

import './Layout.css';

const COLUMS_TOTAL = 12;

const SIDEBAR_SIZE_MAP = {
    small: 2,
    medium: 3,
    large: 4
};

const getSidebarLayoutColumns = (sidebar) => {
    const sidebarSize = SIDEBAR_SIZE_MAP[sidebar.width];

    if (sidebar.location === 'right') {
        return {
            first: COLUMS_TOTAL - sidebarSize,
            second: sidebarSize
        };
    }

    return {
        first: sidebarSize,
        second: COLUMS_TOTAL - sidebarSize
    };
};

const LayoutWitSidebar = ({sidebar, children}) => {
    const columns = getSidebarLayoutColumns(sidebar);

    return (
        <BootstrapRow>
            <BootstrapCol md={columns.first}>
                {sidebar.location === 'left' ? 'SIDEBAR' : children}
            </BootstrapCol>
            <BootstrapCol md={columns.second}>
                {sidebar.location === 'right' ? 'SIDEBAR' : children}
            </BootstrapCol>
        </BootstrapRow>
    );
};

const Layout = (props) => {
    const contentClass = `layout__content ${!props.header && 'layout__content--no-header'}`;
    const { sidebar } = props;

    return (
        <>
            {props.header ? <Header title={props.title} /> : null}
            <BootstrapContainer className={contentClass}>
                {sidebar ? (
                    <LayoutWitSidebar sidebar={sidebar}>{props.children}</LayoutWitSidebar>
                ) : (
                    props.children
                )}
            </BootstrapContainer>
            {props.footer ? <Footer /> : null}
        </>
    );
};

export default Layout;
