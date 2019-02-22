import React, { Component } from 'react';
import dotcms from '../../dotcmsApi'

export default class SimpleWidget extends Component {
    state = {
        widgetCode: ''
    };

    componentDidMount() {
        dotcms.widget.getHtml(this.props.identifier).then((content) => {
            this.setState({
                ...this.state,
                widgetCode: content
            });
        });
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
