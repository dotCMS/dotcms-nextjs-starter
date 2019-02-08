import React from 'react';

import Container from '../Container';

export const Sidebar = (sidebar) => {
    return sidebar.containers.map((container) => {
        return <Container container={container} key={container.identifier} />;
    });
};