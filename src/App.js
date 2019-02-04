import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Page from './Page';
import Layout from './Components/Layout';
import CantRender from './Components/CantRender';
import NewsDetailPage from './Pages/NewsDetail';

import DotCMSApi from './libs/dotcms.api';
import PageContext from './PageContext';

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
            error: null,
            mode: null
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
            .then(({layout, error, viewAs}) => {
                this.setState({
                    layout: layout,
                    pathname: pathname,
                    error: error,
                    mode: viewAs.mode || ''
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
        const { layout, viewAs } = this.props;

        if (layout) {
            this.setState({
                ...this.state,
                layout: layout,
                pathname: this.props.location.pathname,
                mode: viewAs ? viewAs.mode : ''
            });
        } else {
            this.setPage(this.props.location.pathname);
        }
    }

    render() {
        return (
            <PageContext.Provider
                value={{
                    mode: this.state.mode
                }}
            >
                <Layout>
                    {this.state.error === ERROR_UNAUTHORIZED_USER ? <NoAuth /> : <Page data={this.state.layout} />}
                </Layout>
            </PageContext.Provider>
        );
    }
}

const App = page => {
    return (
        <Switch>
            <Route path="/news-events/news/:slug" component={NewsDetailPage} />
            <Route render={props => <PageFetchWrapper {...props} {...page} />} />
        </Switch>
    );
};
export default App;
