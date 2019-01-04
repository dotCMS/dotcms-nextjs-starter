import React from 'react';
import DotContainer from '../libs/DotContainer';
import Contentlet from './Contentlet';

const Container = ({container}) => {
    return (
        <DotContainer data={container}>
            {
                container.contentlets.map(contentlet => {
                    return <Contentlet key={contentlet.identifier} data={contentlet}></Contentlet>
                })
            }
        </DotContainer>
    )
};

export default Container;
