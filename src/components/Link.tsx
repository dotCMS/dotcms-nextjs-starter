// Dependencies
import * as React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { LinkProps as LinkNextProps } from 'next/link'

// Internals
import PageContext from '@/contexts/PageContext'
import { emitEMANavEvent } from '@/lib/dotCMS'
import { clsx } from '@/utils'

export type LinkProps = React.ComponentProps<'a'> &
  LinkNextProps & {
    activeClassName?: string
  }

export const Link: React.FC<LinkProps> = ({
  as,
  activeClassName,
  href,
  locale,
  passHref,
  replace,
  scroll,
  shallow,
  ...rest
}) => {
  const { isEditMode } = React.useContext(PageContext)
  const router = useRouter()

  // If the href is external (i.e. not internal), we don't want to
  // pass the href to the next/link component. So we'll just pass
  // the href to a normal anchor tag with a target of _blank and
  // a rel of noopener noreferrer to prevent the page from being
  // supplanted.
  if (href.startsWith('http')) {
    return <a {...rest} href={href} rel="noopener noreferrer" target="_blank" />
  }

  // If we are in edit mode, we want to send an event to dotCMS.
  if (isEditMode) {
    return (
      <a
        {...rest}
        onClick={() => emitEMANavEvent(href)}
        style={{ cursor: 'pointer' }}
      />
    )
  }

  const isActive = router.pathname === href

  return (
    <NextLink
      as={as}
      href={href}
      locale={locale}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <a
        {...rest}
        aria-current={isActive ? 'page' : undefined}
        className={clsx(rest.className, isActive && activeClassName)}
      />
    </NextLink>
  )
}

export default Link
