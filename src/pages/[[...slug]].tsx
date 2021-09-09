// Dependencies
import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next'

// Internals
import { CustomError, DotCMSPage } from '@/components'
import {
  getPageList,
  getPageUrl,
  getPage,
  getNav,
  getPathsArray,
  getLanguageProps,
} from '@/lib/dotCMS'
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  // Fetch pages from DotCMS and get all the urls in an array of strings, ex:
  // ['/destinations/index', '/store/index', '/store/category/snow'];

  const pageList = await getPageList()

  // Using the array of urls return a collection of paths, ex:
  // [
  //     { params: { slug: '/destinations' } },
  //     { params: { slug: '/store' } }
  //     { params: { slug: '/store/category/snow' } }
  // ]
  let paths = []
  let pagesPaths = getPathsArray(pageList)

  for (const locale of locales as string[]) {
    pagesPaths.forEach((page) => {
      paths.push({ ...page, locale })
    })
  }

  // Then Next.js will statically generate /destinations, /store and /store/category/snow at build time using the page component in pages/[...slug].js.
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { locale, params } = context

    const { languageId, hasLanguages, ...rest } = await getLanguageProps(locale)

    const url = await getPageUrl(params?.slug as string[])
    // Fetch the page object from DotCMS Page API
    let pageRender = await getPage(url, String(languageId))

    // Fetch the navigation from DotCMS Navigation API
    const nav = await getNav('4')

    return {
      props: {
        pageRender,
        nav,
        languageProps: { languageId, hasLanguages, ...rest },
      },
      revalidate: 1,
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
