// Internals
import CustomDate from '../../CustomDate'

/**
 * Create a Markup object from a string
 *
 * @param html - The string to convert to a Markup object
 */
function createMarkup(html: string) {
  return { __html: html }
}

export type CalendarEventProps = {
  description: string
  endDate: string
  startDate: string
  title: string
}

export const CalendarEvent = ({
  title,
  startDate,
  endDate,
  description,
}: CalendarEventProps) => (
  <div className="event">
    <h2>{title}</h2>
    <CustomDate value={startDate} />
    <CustomDate value={endDate} />
    <span dangerouslySetInnerHTML={createMarkup(description)} />
  </div>
)

export default CalendarEvent
