import PropTypes from 'prop-types';
import DateTimeFormat from '../shared/DateTimeFormat';

function createMarkup(html) {
    return { __html: html };
}

const calendarEvent = ({ title, startDate, endDate, description }) => {
    return (
        <div className="event">
            <h2>{title}</h2>
            <DateTimeFormat value={startDate} />
            <DateTimeFormat value={endDate} />
            <span dangerouslySetInnerHTML={createMarkup(description)} />
        </div>
    );
};

calendarEvent.propTypes = {
    description: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default calendarEvent;
