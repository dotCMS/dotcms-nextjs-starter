import { useState, useEffect } from 'react'

/**
 * With this custom hook we can fetch data from the DotCMS library
 */
export default function useDotCMSApi(fetchDotCMS) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  async function fetchData() {
    const response = await fetchDotCMS()
    setData(response)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return [loading, data]
}
