import React, { Component } from 'react';
import DotCMSApi from '../../libs/dotcms.api';

export default class SimpleWidget extends Component {
    _isMounted = false;
    state = {
        widgetCode: ''
    };

    componentDidMount() {
        this._isMounted = true;
        DotCMSApi.page.getWidgetHtml(this.props.identifier).then((content) => {
            if (this._isMounted) {
                this.setState({
                    ...this.state,
                    widgetCode: content
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="widget">
                <div dangerouslySetInnerHTML={{ __html: this.state.widgetCode }} />
                <h6>{this.props.widgetTitle}</h6>
            </div>
        );
    }
}
