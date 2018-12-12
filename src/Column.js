import React from 'react';
import Container from './Container'

const Column = ({col}) => {
    return (
        <div className="column">
            {col.containers.map((container, i) => {
                return <Container container={container} key={i}></Container>;
            })}
        </div>
    )
};

export default Column;
