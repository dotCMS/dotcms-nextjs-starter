import React from 'react';

function Layout(props) {
    const { children } = props;
    return <div className="layout">{children}</div>;
}

export default Layout;
