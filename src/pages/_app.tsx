// Dependencies
import * as React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import type { AppProps } from 'next/app'

// Internals
import { GlobalStyle } from '@/styles/global'
import '@/styles/tailwind.css'

// Binding events
Router.events.on('routeChangeStart', (url) => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />

      <Component {...pageProps} />
    </>
  )
}

export default App
