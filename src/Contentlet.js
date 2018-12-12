import React from 'react';
import DotContentlet from './libs/DotContentlet';

function createMarkup(html) { return {__html: html}; };

const ContentGeneric = ({data}) => {
    return (
        <div className="content">
            <h2>{data.title}</h2>
            <span dangerouslySetInnerHTML={createMarkup(data.body)} />
        </div>
    )
}

const CalendarEvent = ({data}) => {
    return (
        <div className="event">
            <h2>{data.title}</h2>
            <time>{data.startDate}</time>
            <time>{data.startEndDate}</time>
            <span dangerouslySetInnerHTML={createMarkup(data.description)} />
        </div>
    )
}

const SimpleWidget = ({data}) => {
    return (
        <div className="widget">
            <h2>{data.widgetTitle}</h2>
        </div>
    )
}

const getComponent = (data) => {
    switch (data.dotType) {
        case 'webPageContent':
            return ContentGeneric;
        case 'calendarEvent':
            return CalendarEvent;
        case 'SimpleWidget':
            return SimpleWidget;
        default: 
            return ContentGeneric;
    }
}


const Contentlet = ({data}) => {
    const Component = getComponent(data);
    return (
        <DotContentlet data={data}>
            <Component data={data} />
        </DotContentlet>
    )
};

export default Contentlet;
