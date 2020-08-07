import React, { useContext } from 'react';
import Nav from './Nav/Nav';
import Footer from './Footer';
import PageContext from '../../../contexts/PageContext';

export default function Layout({ children }) {
    const {
        pageRender: {
            layout: { header, footer }
        }
    } = useContext(PageContext);
    return (
        <>
            {header ? <Nav /> : null}
            {children}
            {footer ? <Footer /> : null}
        </>
    );
}
