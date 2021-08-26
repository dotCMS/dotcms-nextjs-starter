// Internals
import {
  Activity,
  ActivityDetail,
  Banner,
  BannerCarousel,
  BlogDetail,
  CalendarEventDetail,
  CategoryFilter,
  Form,
  Image,
  Product,
  ProductDetail,
  StoreProductList,
  Video,
  WebPageContent,
} from '@/components'

const components = {
  Activity,
  ActivityDetail,
  Banner,
  BannerCarousel,
  BlogDetail,
  CategoryFilter,
  Image,
  Product,
  ProductDetail,
  StoreProductList,
  Video,
  calendarEventDetail: CalendarEventDetail,
  forms: Form,
  webPageContent: WebPageContent,
}

const FallbackComponent = ({ contentType }: { contentType: string }) => {
  return (
    <h3>You don&apos;t have a component for the content type: {contentType}</h3>
  )
}

/**
 * Get the component to render base on the contentlet content type
 */
export const getComponent = ({ contentType }: { contentType: string }) => {
  // @ts-ignore we can index by contentType name
  return components[contentType] || FallbackComponent
}

export default getComponent
