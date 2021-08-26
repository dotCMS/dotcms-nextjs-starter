// Dependencies
import dynamic from 'next/dynamic'

export const ActivityDetail = dynamic(() => import('./ActivityDetail'))
export const BlogDetail = dynamic(() => import('./BlogDetail'))
export const CalendarEventDetail = dynamic(
  () => import('./CalendarEventDetail')
)
export const ProductDetail = dynamic(
  () => import('./ProductDetail/ProductDetail')
)
