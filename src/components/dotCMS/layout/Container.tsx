// Dependencies
import * as React from 'react'
import reactifyWc from 'reactify-wc'

// Internals
import { PageContext } from '@/contexts'
import { Contentlet } from './Contentlet'

/*
React passes all data to Custom Elements in the form of HTML
attributes. For primitive data this is fine, but the system
breaks down when passing rich data, like objects or arrays. 
In these instances you end up with stringified values like
some-attr="[object Object]" which can't actually be used.

More info: https://github.com/facebook/react/issues/11347

Given this issue we use `reactify-wc` to make React works
with Web Components: https://www.npmjs.com/package/reactify-wc 
*/
const DotCMSEditContainerWrapper = reactifyWc('dotcms-ema-container')
const DotCMSEditContentletWrapper = reactifyWc('dotcms-ema-contentlet')

export type ContentletWrapperProps = {
  children: React.ReactNode
  // TODO: add correct types with GraphQL-Codegen
  contentlet: Record<string, string | boolean>
  isEditMode: boolean
}

export const ContentletWrapper = ({
  children,
  contentlet,
  isEditMode,
}: ContentletWrapperProps) => {
  if (isEditMode) {
    contentlet.dotCanEdit = true

    return (
      // @ts-ignore: TODO: add correct types
      <DotCMSEditContentletWrapper contentlet={contentlet}>
        {children}
      </DotCMSEditContentletWrapper>
    )
  }

  return <>{children}</>
}

export type ContainerWrapperProps = {
  children: React.ReactNode
  // TODO: add correct types with GraphQL-Codegen
  container: any
  isEditMode: boolean
}

export const ContainerWrapper = ({
  children,
  container,
  isEditMode,
}: ContainerWrapperProps) => {
  if (isEditMode) {
    return (
      // @ts-ignore: TODO: add correct types
      <DotCMSEditContainerWrapper container={container}>
        {children}
      </DotCMSEditContainerWrapper>
    )
  }

  return <>{children}</>
}

type ContentletsProps = {
  contentlets?: any[]
}

const Contentlets = ({ contentlets }: ContentletsProps) => {
  const { isEditMode } = React.useContext(PageContext)

  return contentlets?.length ? (
    <>
      {contentlets?.map((contentlet) => {
        if (contentlet.contentType === 'SimpleWidget') {
          return null
        }

        return (
          <ContentletWrapper
            contentlet={contentlet}
            isEditMode={isEditMode}
            key={contentlet.identifier}
          >
            <Contentlet data={contentlet} />
          </ContentletWrapper>
        )
      })}
    </>
  ) : null
}

export type ContentletContainerProps = {
  // TODO: add correct types with GraphQL-Codegen
  container: any
}

export const ContentletContainer = ({
  container,
}: ContentletContainerProps) => {
  const { isEditMode } = React.useContext(PageContext)

  return (
    <ContainerWrapper container={container} isEditMode={isEditMode}>
      <Contentlets {...container} />
    </ContainerWrapper>
  )
}

export default ContentletContainer
