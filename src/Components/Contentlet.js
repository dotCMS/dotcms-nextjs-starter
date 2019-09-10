import React, { Component } from 'react';
import Loadable from 'react-loadable';

import { Spinner } from 'reactstrap';
import DotContentlet from '../libs/DotContentlet';
import SimpleWidget from './DotCMS/SimpleWidget';
import PageContext from '../PageContext';
import CantRender from './CantRender';

import dotCMSApi from '../dotcmsApi';

const Loading = ({ error, showContentletWarning, contentlet }) => {
    const divStyle = {
        textAlign: 'center',
        padding: '2rem'
    };
    return error ? (
        contentlet.baseType === 'WIDGET' ? (
            <SimpleWidget identifier={contentlet.identifier} />
        ) : showContentletWarning ? (
            <CantRender color="warning" title={contentlet.title}>
                <p>{error.message}</p>
            </CantRender>
        ) : (
            ''
        )
    ) : (
        <div style={divStyle}>
            <Spinner color="primary" />
        </div>
    );
};

export default class Contentlet extends Component {
    static contextType = PageContext;

    constructor() {
        super();
        this.state = {
            form: null
        };
    }

    componentDidMount() {
        if (this.props.data.contentType === 'forms') {
            dotCMSApi.form
                .get({
                    contentType: this.props.data.formId,
                    identifier: this.props.data.formId,
                    win: window
                })
                .create()
                .then((form) => {
                    this.setState({
                        form: form
                    });
                });
        }
    }

    render() {
        const showLoadableContentletWarning = this.context.mode !== 'ADMIN_MODE';
        const isEditMode = this.context.mode === 'EDIT_MODE';

        let Component = Loadable({
            loader: () => import(`./DotCMS/${this.props.data.contentType}`),
            loading: (props) => (
                <Loading
                    contentlet={this.props.data}
                    showContentletWarning={showLoadableContentletWarning}
                    {...props}
                />
            )
        });

        if (this.state.form) {
            Component = () => <div ref={(ref) => ref && ref.appendChild(this.state.form)} />
        }

        const isEditModeFromDotCMS =
            isEditMode && this.context.page && this.context.page.remoteRendered;

        return isEditModeFromDotCMS ? (
            <DotContentlet {...this.props.data}>
                <Component {...this.props.data} />
            </DotContentlet>
        ) : (
            <Component {...this.props.data} />
        );
    }
}
