// Dependencies
import * as React from 'react'

// Internals
import { PageContext } from '@/contexts'
import { dotCMS } from '@/lib/dotCMS'

export const NavSort = () => {
  const { pageRender, isEditMode } = React.useContext<any>(PageContext)

  const { site, page } = pageRender

  const emitEvent = () => {
    const siteId = site ? site.identifier : ''
    const pageUrl = page ? page.pageURI : ''
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

  return isEditMode ? (
    <button
      className="nav-sort__button btn btn-light"
      onClick={() => emitEvent()}
    >
      <img
        alt="Sort Menu"
        height="24"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABdUlEQVRoge2ZK0sEURiGH2+IiCIIgmAwGCwGgwaTxWQymWw2m80/sE2TJpvJZDJZTAYNBovBYBAEQRAWEfFe5nVh3XV2Lucc9/M88MK0eZ8wM2e+DyKRtmUjSVuzBnwmWQ/cJTcrwDs1kQ9gNWijHCwBr9QklDdgOWCvTCwAz/yUUF6AxWDtWmQOeKS5hPIEzAfqmMosUCVdQqkCM0Ga/sIUcE/rEsoDMB2gb0MmgFuySyh3wKT31nWMAdfkl1BugHHP3b8ZAS5TCmbJFTDq1QAYAs4LFm+UC2DYl8QAcOZAQjlN7uGUPuDYoYRyAvS7kugBDj1IKEdAb9kSXcC+RwnlAOguS6ID2A0goewBnWWIbAaUULaLSlT+gIRSKSoTiUSaY+phN/H6BUMfRDByRBEmDo3CxDFemPixEiZ+dYWJ4YMwMQ4SJgZ0wsTIVJgYYgsTawVhYtEjTKzehIllqPC2ni79iFzHDjCYXG85vlckEvkPfAEI5am24OmsCgAAAABJRU5ErkJggg=="
        width="24"
      />
    </button>
  ) : null
}

export default NavSort
