import React, { Component } from 'react';
import DotContainer from '../libs/DotContainer';
import Contentlet from './Contentlet';

import PageContext from '../PageContext';

const Contentlets = container => {
    return container.contentlets.map(contentlet => {
        return <Contentlet key={contentlet.identifier} data={contentlet} />;
    });
};

class Container extends Component {
    static contextType = PageContext;

    render() {
        const { container } = this.props;
        return this.context.mode === 'EDIT_MODE' ? (
            <DotContainer data={container}>
                <Contentlets {...container} />
            </DotContainer>
        ) : (
            <Contentlets {...container} />
        );
    }
}

export default Container;
