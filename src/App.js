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
        const isEditModeFromDotCMS = this.props.page && this.props.page.remoteRendered;

        if (isEditModeFromDotCMS) {
            DotCMSApi.page.emitNavigationEnd(pathname);
            return;
        }

        DotCMSApi.page
            .get({
                pathname: pathname
            })
            .then(({ layout, error, viewAs, page }) => {
                this.setState({
                    layout: layout,
                    title: page ? page.title : '',
                    pathname: pathname,
                    error: error,
                    mode: viewAs ? viewAs.mode : ''
                });
            });
    }

    shouldComponentUpdate(nextProps, prevState) {
        if (this.doesUrlChange(nextProps, prevState)) {
            this.setPage(nextProps.location.pathname);
        }

        return true;
    }

    componentDidMount() {
        const { layout, viewAs, page } = this.props;

        if (layout) {
            this.setState({
                ...this.state,
                layout: layout,
                title: page ? page.title : '',
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
                <Layout title={this.state.title}>
                    {this.state.error === ERROR_UNAUTHORIZED_USER ? (
                        <NoAuth />
                    ) : (
                        <Page data={this.state.layout} />
                    )}
                </Layout>
            </PageContext.Provider>
        );
    }
}

const App = (page) => {
    return (
        <Switch>
            <Route path="/news-events/news/:slug" component={NewsDetailPage} />
            <Route render={(props) => <PageFetchWrapper {...props} {...page} />} />
        </Switch>
    );
};
export default App;
