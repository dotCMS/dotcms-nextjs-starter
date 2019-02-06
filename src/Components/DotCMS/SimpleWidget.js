import React, { Component } from 'react';
import dotcmsApi from '../../libs/dotcms.api';

export default class SimpleWidget extends Component {
    state = {
        widgetCode:'test'
    };

    componentDidMount() {
        dotcmsApi.request({
            url: `${process.env.REACT_APP_DOTCMS_HOST}/api/widget/id/` + this.props.identifier
        })
        .then(response =>  response.text())
        .then(text => {
            console.log(text)
            this.setState({
                ...this.state,
                widgetCode: text
            });
 
        })
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
