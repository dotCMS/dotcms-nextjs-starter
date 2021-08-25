// Internals
import {
  ProductDetail,
  CalendarEventDetail,
  BlogDetail,
  ActivityDetail,
} from '@/components/dotCMS/pages'

const components = {
  ProductDetail,
  calendarEventDetail: CalendarEventDetail,
  BlogDetail,
  ActivityDetail,
}

/**
 * Get the component to render a especific detail page
 */
export const getPageComponent = (contentType: string): JSX.Element | null => {
  return components[`${contentType}Detail`] || null
}
