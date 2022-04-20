// Dependencies
import * as React from 'react'

// Internals
import { getPageComponent } from '@/lib/dotCMS'
import { PageContext } from '@/contexts'
import Layout from './Layout'
import LayoutGrid from './LayoutGrid'
import { PageRender } from '../pages/type'

// TODO: add correct types with GraphQL-Codegen
export type DotCMSPageProps = any

export const DotCMSPage = ({
  pageRender,
  nav,
  isEditMode,
  languageProps,
}: DotCMSPageProps) => {
  let DetailPage: React.FC<{ pageRender: PageRender }> | null

  if (pageRender?.urlContentMap) {
    const { urlContentMap } = pageRender

    DetailPage = getPageComponent(urlContentMap.contentType)
  }

  const contextValue = {
    isEditMode,
    nav,
    pageRender,
    languageProps,
    language: {},
  }

  // When the page is generating during request (for example `/store/category-tag` pages) we don't want to show anything.
  if (typeof pageRender === 'undefined') return null

  return (
    <PageContext.Provider value={contextValue}>
      {pageRender?.layout ? (
        <Layout>
          {DetailPage ? <DetailPage pageRender={pageRender} /> : <LayoutGrid />}
        </Layout>
      ) : (
        <h1>No layout in this page</h1>
      )}
    </PageContext.Provider>
  )
}

export default DotCMSPage
