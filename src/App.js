import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Page from './Page';
import Login from './Pages/Login';
import NewsDetailPage from './Pages/NewsDetail';
import DotCMSApi from './libs/dotcms.api';

const ERROR_UNAUTHORIZED_USER = '400';
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
                    error: null
                });
                DotCMSApi.page.emitNavigationEnd(pathname);
            }).catch(err => {
                this.setState({
                    layout: {},
                    pathname: pathname,
                    error: err.message
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
        if (this.state.error === ERROR_UNAUTHORIZED_USER) {
            return <Redirect to="/login" />;
        }

        return <Page data={this.state.layout} error={this.state.error} />;
    }
}

const App = data => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/news-events/news/:id" component={NewsDetailPage} />
            <Route render={props => <PageFetchWrapper {...props} {...data} />} />
        </Switch>
    );
};
export default App;
