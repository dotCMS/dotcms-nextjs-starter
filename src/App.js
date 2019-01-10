import React, { Component } from 'react';

import Page from './Page';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import DotCMSApi from '../src/libs/dotcms.api';

class PageFetchWrapper extends Component {
    constructor() {
        super();
        this.state = {
            page: {},
            pathname: null
        };
    }

    async setPage(pathname) {
        const data = await DotCMSApi.getPage({
            pathname: pathname
        });

        this.setState({
            page: data,
            pathname: pathname
        });
    }

    async shouldComponentUpdate(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            this.setPage(nextProps.location.pathname);
        }

        return true;
    }

    async componentDidMount() {
        this.setPage(this.props.location.pathname);
    }

    render() {
        return <Page data={this.state.page.layout} />;
    }
}

const App = data => {
    return (
        <Router>
            <Route component={PageFetchWrapper} />
        </Router>
    );
};
export default App;
