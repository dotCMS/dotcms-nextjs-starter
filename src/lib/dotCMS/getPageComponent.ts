// Internals
import {
  ProductDetail,
  calendarEventDetail,
  BlogDetail,
  ActivityDetail,
} from '@/components/dotcms/content-types'

const components = {
  ProductDetail,
  calendarEventDetail,
  BlogDetail,
  ActivityDetail,
}

/**
 * Get the component to render a especific detail page
 */
export const getPageComponent = (contentType: string): JSX.Element | null => {
  return components[`${contentType}Detail`] || null
}
