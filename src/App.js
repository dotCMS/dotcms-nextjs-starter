import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Page from './Page';
import DotCMSApi from '../src/libs/dotcms.api';

class PageFetchWrapper extends Component {
    constructor() {
        super();
        this.state = {
            layout: {},
            pathname: null
        };
    }

    async setPage(pathname) {
        const data = await DotCMSApi.getPage({
            pathname: pathname
        });

        this.setState({
            layout: data.layout,
            pathname: pathname
        });

        DotCMSApi.emitEditPage(pathname);
    }

    async shouldComponentUpdate(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            this.setPage(nextProps.location.pathname);
        }

        return true;
    }

    async componentDidMount() {
        if (this.props.data) {
            this.setState({
                layout: this.props.data,
                pathname: this.props.location.pathname
            });
        } else {
            this.setPage(this.props.location.pathname);
        }
    }

    render() {
        return <Page data={this.state.layout} />;
    }
}

const App = data => {
    return (
        <Route render={(props) => <PageFetchWrapper {...props} {...data} />} />
    );
};
export default App;
