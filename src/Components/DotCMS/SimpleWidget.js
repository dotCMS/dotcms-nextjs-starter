import React, { Component } from 'react';

export default class SimpleWidget extends Component {
    render() {
        return (
            <div className="widget">
                <h2>{this.props.widgetTitle}</h2>
                (Simple Widget)
            </div>
        );
    }
}
