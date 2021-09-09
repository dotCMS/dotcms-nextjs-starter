// Dependencies
import * as React from 'react'
import { useRouter } from 'next/router'

// Internals
import { PageContext } from '@/contexts'
import { LanguageSelect } from './styles'

export const LanguageSelector = () => {
  const router = useRouter()
  const [language, setLanguage] = React.useState(() => router.locale)
  // @ts-ignore TODO: add the correct types
  const { languageProps } = React.useContext(PageContext)

  const handleLanguageChange = (value: string) => {
    setLanguage(value)

    return router.push(router.asPath, undefined, {
      locale: value,
    })
  }

  return (
    <div className="form-wrap-select">
      <LanguageSelect
        className="form-input"
        onChange={({ target }) => {
          handleLanguageChange(target.value)
        }}
        value={language}
      >
        {Object.keys(languageProps).length > 0 &&
          languageProps.languages.map((lang: Record<string, string>) => (
            <option key={lang.id} value={lang.languageCode}>
              {lang.language}
            </option>
          ))}
      </LanguageSelect>
    </div>
  )
}

export default LanguageSelector
