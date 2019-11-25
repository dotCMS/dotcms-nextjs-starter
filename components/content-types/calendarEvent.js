import DateTimeFormat from '../Shared/DateTimeFormat';

function createMarkup(html) {
    return { __html: html };
}

export default function calendarEvent(props) {
    return (
        <div className="event">
            <h2>{props.title}</h2>
            <DateTimeFormat value={props.startDate} />
            <DateTimeFormat value={props.endDate} />
            <span dangerouslySetInnerHTML={createMarkup(props.description)} />
        </div>
    );
}
