// Dependencies
import { initDotCMS } from 'dotcms'

export const dotCMS = initDotCMS({
  host: process.env.NEXT_PUBLIC_DOTCMS_HOST as string,
  token: process.env.BEARER_TOKEN as string,
})

export default dotCMS
