// Dependencies
import * as React from 'react'
import { parseBody } from 'next/dist/server/api-utils'
import type { GetServerSideProps, NextPage } from 'next'

// Internals
import { DotCMSPage } from '@/components'
import { getLanguageProps, getNav } from '@/lib/dotCMS'

// TODO: This is a temporary solution to get the props we must pass to the correct types
export type DotCMSStaticPageProps = {
  pageRender: any
  nav: any
  languageProps: any
}

const DotCMSStaticPage: NextPage<DotCMSStaticPageProps> = ({
  pageRender,
  nav,
  languageProps,
}) => {
  React.useEffect(() => {
    if (process.browser) {
      /*
        To make DotCMS edit mode works we need information about containers and contentlets.
        DotCMS reads that information from data-attr in the HTML, to keep things simeple
        we create a library with two Web Components to pass that data.

        Web Component library: https://www.npmjs.com/package/dotcms-ema-elements
        More information in the component: components/dotcms/layout/Container.js
      */
      import('dotcms-ema-elements/loader').then((module) => {
        module.applyPolyfills().then(() => {
          module.defineCustomElements(window)
        })
      })
    }
  })

  if (!pageRender) {
    return process.env.NODE_ENV === 'development' ? (
      <>
        <h1>Edit Mode Anywhere</h1>
        <p>
          This page is only used for Edit Mode Anywhere:{' '}
          <a
            href="https://dotcms.com/blog/post/headless-cms-for-marketers-deep-dive-into-edit-mode-anywhere#:~:text=The%20eventual%20ai[…]0(IoT)%20capable%20device%2C"
            rel="noopener noreferrer"
            target="_blank"
          >
            More info
          </a>
        </p>
      </>
    ) : (
      <h1>Error 404</h1>
    )
  }

  return (
    <DotCMSPage
      isEditMode={true}
      languageProps={languageProps}
      nav={nav}
      pageRender={pageRender}
    />
  )
}

// DotCMS will POST this page with the page object in the body.
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // We get the body. Note: We put any because of a problem with the type definition
    const body = await parseBody(req as any, '1mb')

    const pageRender = JSON.parse(body.dotPageData).entity

    // Optional but better performance: we get the navigation and language server side.
    const nav = await getNav(4)
    const { languageId, hasLanguages, ...rest } = await getLanguageProps()

    // Return the props to be shown in the component
    return {
      props: {
        pageRender,
        nav,
        languageProps: { languageId, hasLanguages, ...rest },
      },
    }
  } catch (error) {
    console.error(error)

    return {
      props: {},
      notFound: true,
    }
  }
}

export default DotCMSStaticPage
