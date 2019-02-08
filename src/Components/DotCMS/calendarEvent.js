import React, { Component } from 'react';

import moment from 'react-moment';



function createMarkup(html) {
    return { __html: html };
}

export default class calendarEvent extends Component {
    render() {
        
        var startDate = new Date(this.props.startDate);
        var endDate = new Date(this.props.endDate);
        var desc = (this.props.description + "") ;
        desc = desc.length>200 ? this.props.description.substring(0,200) : this.props.description
        desc+="...";
        return (
            <div className="event">
                <h2>{this.props.title}</h2>

                <time><b><Moment format="MMM, D">{startDate}</Moment></b>: <Moment format="H:mm">{startDate}</Moment>-<Moment format="H:mm">{endDate}</Moment></time>
                <span dangerouslySetInnerHTML={createMarkup(desc)} />


            </div>
        );
    }
}
