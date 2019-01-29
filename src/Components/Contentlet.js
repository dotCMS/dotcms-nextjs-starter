import React, { Component } from 'react';
import Loadable from 'react-loadable';

import DotContentlet from '../libs/DotContentlet';
import CantRender from './CantRender';

const Loading = props => {
    if (props.error) {
        return (
            <CantRender color="warning" title="Error">
                <p>{props.error.message}</p>
            </CantRender>
        );
    }

    return <h1>Loading</h1>;
};

export default class Contentlet extends Component {
    render() {
        const Component = Loadable({
            loader: () => import(`./DotCMS/${this.props.data.contentType}`),
            loading: Loading
        });

        return (
            <DotContentlet data={this.props.data}>
                <Component {...this.props.data} />
            </DotContentlet>
        );
    }
}
