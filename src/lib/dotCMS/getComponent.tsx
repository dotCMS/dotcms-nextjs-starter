// Internals
import {
  Activity,
  Banner,
  BannerCarousel,
  CategoryFilter,
  Form,
  Image,
  Product,
  StoreProductList,
  Video,
  WebPageContent,
} from '@/components/dotCMS/content-types'
import {
  ActivityDetail,
  BlogDetail,
  CalendarEventDetail,
  ProductDetail,
} from '@/components/dotCMS/pages'

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
