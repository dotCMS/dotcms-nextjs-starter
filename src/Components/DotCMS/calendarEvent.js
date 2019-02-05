import React, { Component } from 'react';

function createMarkup(html) {
    return { __html: html };
}

export default class calendarEvent extends Component {
    render() {
        
        var startDate = new Date(this.props.startDate);
        var endDate = new Date(this.props.startEndDate);
        console.log(startDate)
        return (
            <div className="event">
                <h2>{this.props.title}</h2>
                <time>{startDate + " "}</time>
                <time>{this.props.startEndDate}</time>
                <span dangerouslySetInnerHTML={createMarkup(this.props.description)} />
            </div>
        );
    }
}
