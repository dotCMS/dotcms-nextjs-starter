// Dependencies
import * as React from 'react'

/**
 * With this custom hook we can fetch data from the DotCMS library
 *
 * Note: we use `P` to be a generic type for the props, so the hook
 * can be typed of what type of response we get from the API.
 */
export function useDotCMSApi<P>(fetchDotCMS: () => Promise<P>): [boolean, P] {
  const [data, setData] = React.useState<P>()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    /**
     * We fetch data on mount and unmount
     *
     * Note: we called here to avoid adding that to the dependency
     * array of `useEffect`
     */
    async function fetchData() {
      const response = await fetchDotCMS()

      setData(response)
      setLoading(false)
    }

    fetchData()
  }, [fetchDotCMS])

  return [loading, data as P]
}
