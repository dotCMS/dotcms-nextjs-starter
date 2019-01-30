import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Page from './Page';
import Layout from './Components/Layout';
import CantRender from './Components/CantRender';
import NewsDetailPage from './Pages/NewsDetail';

import DotCMSApi from './libs/dotcms.api';

const ERROR_UNAUTHORIZED_USER = '400';

const NoAuth = () => (
    <CantRender title="Invalid Authorization Token" color="warning">
        <p>
            Please set one in the <code>.env</code> file or use <code>npm run auth:start</code>
        </p>
    </CantRender>
);

class PageFetchWrapper extends Component {
    constructor() {
        super();
        this.state = {
            layout: {},
            pathname: null,
            error: null
        };
    }

    doesUrlChange(nextProps, prevState) {
        return prevState.pathname && nextProps.location.pathname !== prevState.pathname;
    }

    setPage(pathname) {
        DotCMSApi.page
            .get({
                pathname: pathname
            })
            .then(data => {
                this.setState({
                    layout: data.layout,
                    pathname: pathname,
                    error: data.error
                });
                DotCMSApi.page.emitNavigationEnd(pathname);
            });
    }

    shouldComponentUpdate(nextProps, prevState) {
        if (this.doesUrlChange(nextProps, prevState)) {
            this.setPage(nextProps.location.pathname);
        }

        return true;
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState({
                ...this.state,
                layout: this.props.data,
                pathname: this.props.location.pathname
            });
        } else {
            this.setPage(this.props.location.pathname);
        }
    }

    render() {
        return (
            <Layout>
                {this.state.error === ERROR_UNAUTHORIZED_USER ? <NoAuth /> : <Page data={this.state.layout} />}
            </Layout>
        );
    }
}

const App = data => {
    return (
        <Switch>
            <Route path="/news-events/news/:slug" component={NewsDetailPage} />
            <Route render={props => <PageFetchWrapper {...props} {...data} />} />
        </Switch>
    );
};
export default App;
