import {
  Banner,
  StoreProductList,
  webPageContent,
  ProductDetail,
  CategoryFilter,
  Activity,
  Image,
  Video,
  Product,
  calendarEventDetail,
  BlogDetail,
  ActivityDetail,
  BannerCarousel,
  forms,
} from '../../components/dotCMS/content-types'

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
  calendarEventDetail,
  forms,
  webPageContent,
}

const FallbackComponent = ({ contentType }) => {
  return (
    <h3>You don&apos;t have a component for the content type: {contentType}</h3>
  )
}

/**
 * Get the component to render base on the contentlet content type
 *
 */
const getComponent = ({ contentType }) => {
  return components[contentType] || FallbackComponent
}

export default getComponent
