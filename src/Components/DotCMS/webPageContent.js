import React, { Component } from 'react';

function createMarkup(html) {
    return { __html: html };
}

export default class webPageContent extends Component {
    render() {
        return (
            <div className="content">
                <span dangerouslySetInnerHTML={createMarkup(this.props.body)} />
            </div>
        );
    }
}
