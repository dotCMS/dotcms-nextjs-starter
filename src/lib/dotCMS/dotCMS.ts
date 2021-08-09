// Dependencies
import { initDotCMS } from 'dotcms'

export const dotCMS = initDotCMS({
  host: process.env.NEXT_PUBLIC_DOTCMS_HOST,
  token: process.env.BEARER_TOKEN,
})
