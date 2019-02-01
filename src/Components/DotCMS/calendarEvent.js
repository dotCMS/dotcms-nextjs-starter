import React, { Component } from 'react';

function createMarkup(html) {
    return { __html: html };
}

export default class calendarEvent extends Component {
    render() {
        return (
            <div className="event">
                <h2>{this.props.title}</h2>
                <time>{this.props.startDate}</time>
                <time>{this.props.startEndDate}</time>
                <span dangerouslySetInnerHTML={createMarkup(this.props.description)} />
            </div>
        );
    }
}
