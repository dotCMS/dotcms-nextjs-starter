// Dependencies
import * as React from 'react'
import{
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'
import type { NormalizedCacheObject } from'@apollo/client'


let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/v1/graphql`,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      }}
    })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    _apolloClient.cache.restore(
      initialState as unknown as NormalizedCacheObject
    )
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (
  initialState?: any
): ApolloClient<NormalizedCacheObject> => {
  return React.useMemo(() => initializeApollo(initialState), [initialState])
}
