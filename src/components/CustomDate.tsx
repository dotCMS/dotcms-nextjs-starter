// Internals
import { getDateLocale, getTimeLocale } from '@/utils'

export type CustomDateProps = {
  value: string
  format?: 'DateTime' | 'Date' | 'Time'
  locale?: string
}

export const CustomDate = ({
  value,
  format = 'Date',
  locale = 'en-us',
}: CustomDateProps) => {
  const d = new Date(value)
  let formatString = ''

  switch (format) {
    case 'Date':
      formatString = getDateLocale(d, locale)
      break
    case 'Time':
      formatString = getTimeLocale(d, locale)
      break
    case 'DateTime':
      formatString = `${getDateLocale(d, locale)} at ${getTimeLocale(
        d,
        locale
      )}`
      break
  }

  return <time dateTime={value}>{formatString}</time>
}

export default CustomDate
