import React from 'react';

import { Col as BootstrapCol } from 'reactstrap';

import Container from './Container';

const ColumnContainer = ({ col }) => {
    return (
        <BootstrapCol md={{ size: col.width, offset: col.offset }}>
            {col.containers.map(container => {
                return <Container container={container} key={container.identifier} />;
            })}
        </BootstrapCol>
    );
};

export default ColumnContainer;
