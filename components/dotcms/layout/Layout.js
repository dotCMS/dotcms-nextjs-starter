import React, { useContext } from 'react';
import Header from './Header';
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
            {header ? <Header /> : null}
            {children}
            {footer ? <Footer /> : null}
        </>
    );
}
