import React, { Component } from 'react';
import DotContainer from '../libs/DotContainer';
import Contentlet from './Contentlet';

import PageContext from '../PageContext';

const Contentlets = ({ contentlets }) => {
    return contentlets ? contentlets.map((contentlet) => {
        return <Contentlet key={contentlet.identifier} data={contentlet} />;
    }) : null;
};

class Container extends Component {
    static contextType = PageContext;

    render() {
        const { container } = this.props;
        return this.context.mode === 'EDIT_MODE' && this.context.page && this.context.page.remoteRendered ? (
            <DotContainer data={container}>
                <Contentlets {...container} />
            </DotContainer>
        ) : (
            <Contentlets {...container} />
        );
    }
}

export default Container;
