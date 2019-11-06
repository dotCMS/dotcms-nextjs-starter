import DateFormat from '../Shared/DateFormat';

function createMarkup(html) {
    return { __html: html };
}

export default function calendarEvent(props) {
    return (
        <div className="event">
            <h2>{props.title}</h2>
            <DateFormat dateString={props.startDate} />
            <DateFormat dateString={props.endDate} />
            <span dangerouslySetInnerHTML={createMarkup(props.description)} />
        </div>
    );
}
