// Dependencies
import * as React from 'react'

// Internals
import { PageContext } from '@/contexts'
import { dotCMS } from '@/lib/dotCMS'

export const NavSort = () => {
  const context = React.useContext<any>(PageContext)

  const emitEvent = () => {
    const siteId = context.site ? context.site.identifier : ''
    const pageUrl = context.page ? context.page.pageURI : ''
    const PORLET_ID = 'b7ab5d3c-5ee0-4195-a17e-8f5579d718dd'
    const url = [
      `/c/portal/layout?p_l_id=${PORLET_ID}&p_p_id=site-browser`,
      `&p_p_action=1&p_p_state=maximized&_site_browser_struts_action=%2Fext%2Ffolders%2Forder_menu`,
      `&startLevel=1&depth=2&pagePath=${pageUrl}&hostId=${siteId}`,
    ].join('')

    dotCMS.event.emit({
      name: 'reorder-menu',
      data: url,
    })
  }

  return (
    <button
      className="nav-sort__button btn btn-light"
      onClick={() => emitEvent()}
    >
      <i className="icon-arrow-up3" />
      <i className="icon-arrow-down3" />
    </button>
  )
}

export default NavSort
