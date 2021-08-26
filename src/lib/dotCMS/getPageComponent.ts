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
  // @ts-ignore we can index by contentType name
  return components[`${contentType}Detail`] || null
}
