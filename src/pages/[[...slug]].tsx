// Dependencies
import Head from 'next/head'

// Internals
import { CustomError, DotCMSPage } from '@/components'
import { getPageUrl, getPage, getNav, getLanguageProps } from '@/lib/dotCMS'
import type { CustomErrorProps } from '@/components'

export type PageProps = {
  pageRender: Record<string, any>
  nav: Record<string, any>
  languageProps: Record<string, any>
  error?: CustomErrorProps
}

export default function Page({
  pageRender,
  nav,
  languageProps,
  error,
}: PageProps) {
  if (error) {
    return <CustomError {...error} />
  }

  const { page } = pageRender || {}

  return (
    <>
      <Head>
        <title>dotCMS | {page?.seoTitle || page?.title}</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta
          content={
            page?.seodescription ||
            'This is an example of a meta description. This will often show up in search results.'
          }
          name="description"
        />
      </Head>

      <DotCMSPage
        languageProps={languageProps}
        nav={nav}
        pageRender={pageRender}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const slug = context.query.slug || ['/']

  try {

    const { languageId, hasLanguages, ...rest } = await getLanguageProps(
      'en'
    )

    const url = await getPageUrl(slug, hasLanguages)
    // Fetch the page object from DotCMS Page API
    let pageRender = await getPage(url, String(languageId))

    // Fetch the navigation from DotCMS Navigation API
    const nav = await getNav('4')

    return {
      props: {
        pageRender,
        nav,
        languageProps: { languageId, hasLanguages, ...rest },
      }
    }
  } catch (error) {
    if (error.statusCode) {
      return {
        props: {
          error,
        },
      }
    }

    throw error
  }
}
