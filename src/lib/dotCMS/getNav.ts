// Dependencies
import { DotCMSNavigationItem } from 'dotcms/src/lib/models'

// Internals
import { logInfo } from '@/utils'
import { dotCMS } from './'

export type GetNavResult = {
  href: string
  title: string
  children: DotCMSNavigationItem[]
  folder: boolean
  hash: string
}

/**
 * Get the navigation menu object from dotCMS API
 *
 * @param deep - The depth of the folder tree to return
 * @param location - The root path to begin traversing the folder tree
 */
export async function getNav(
  deep: string | number,
  location = '/'
): Promise<(DotCMSNavigationItem | GetNavResult)[]> {
  if (process.env.NODE_ENV !== 'production') {
    logInfo('DOTCMS NAV, location:' + location + ", deep:" + deep )
  }

  const nav = await dotCMS.nav
    .get(String(deep), "")
    .then((res) => {
        return res.children 
    }).catch((error) => {
        logInfo('DOTCMS NAV ERROR', error)
        return []
    });
  const finalNav = [
    {
      href: '/index',
      title: 'Home',
      children: [],
      folder: false,
      hash: 'home',
    },
    ...nav,
  ]

  return finalNav
}
