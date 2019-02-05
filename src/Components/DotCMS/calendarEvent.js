import React, { Component } from 'react';
import DateFormat from '../Shared/DateFormat';

function createMarkup(html) {
    return { __html: html };
}

export default class calendarEvent extends Component {
    render() {
        return (
            <div className="event">
                <h2>{this.props.title}</h2>
                <DateFormat dateString={this.props.startDate}/>
                <DateFormat dateString={this.props.endDate}/>
                <span dangerouslySetInnerHTML={createMarkup(this.props.description)} />
            </div>
        );
    }
}
