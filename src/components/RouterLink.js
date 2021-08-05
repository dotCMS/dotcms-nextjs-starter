import { useContext } from 'react'
import Link from 'next/link'
import PageContext from '../contexts/PageContext'
import { emitEMANavEvent } from '../utilities/dotcms'
import { getLocaleHref } from './../utilities/dotcms/locale'

const RouterLink = ({ href, children, className, ariaLabel }) => {
  const { isEditMode, languageProps: { defaultLanguage } = {} } =
    useContext(PageContext)

  if (isEditMode) {
    return (
      <a
        aria-label={ariaLabel}
        className={className}
        onClick={() => {
          emitEMANavEvent(href)
        }}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      as={getLocaleHref({
        as: href,
        defaultLang: defaultLanguage,
      })}
      href={'/[[...slug]]'}
    >
      <a aria-label={ariaLabel} className={className}>
        {children}
      </a>
    </Link>
  )
}

export default RouterLink
