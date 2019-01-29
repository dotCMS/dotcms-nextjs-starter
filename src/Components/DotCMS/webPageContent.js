import React, { Component } from 'react';

function createMarkup(html) {
    return { __html: html };
}

export default class webPageContent extends Component {
    render() {
        return (
            <div className="content">
                <h2>{this.props.title}</h2>
                <span dangerouslySetInnerHTML={createMarkup(this.props.body)} />
            </div>
        );
    }
}
