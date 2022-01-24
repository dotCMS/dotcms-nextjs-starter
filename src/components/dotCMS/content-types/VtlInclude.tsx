import { BlogListing } from '@/components'

const components = {
    BlogListing
}

const FallbackComponent = ({ useComponent }: { useComponent: string }) => {
    return (
      <h3>You don&apos;t have a component for the VtlInclude type: {useComponent}</h3>
    )
}

export const VtlInclude = ({ widgetCodeJSON }) => {
    // Get the component to render base on the VtlInclude widgetCodeJSON
    const Component = components[widgetCodeJSON.useComponent] || FallbackComponent;
    return <Component {...widgetCodeJSON} />
}

export default VtlInclude;