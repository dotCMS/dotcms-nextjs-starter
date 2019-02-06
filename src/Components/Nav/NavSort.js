import React, { Component } from 'react';
import DotCMSApi from '../../libs/dotcms.api';
import PageContext from '../../PageContext';

class NavSort extends Component {
    static contextType = PageContext;

    emitEvent(siteId, pageUrl) {
        console.log('--click', siteId, pageUrl);

        const url = [
            `/c/portal/layout?p_l_id=34885ddb-3537-4a79-a02c-0550c5087d5c&p_p_id=site-browser`,
            `&p_p_action=1&p_p_state=maximized&_site_browser_struts_action=%2Fext%2Ffolders%2Forder_menu`,
            `&startLevel=1&depth=2&pagePath=${pageUrl}&hostId=${siteId}`
        ].join('');

        const url2 =
            '/c/portal/layout?p_l_id=34885ddb-3537-4a79-a02c-0550c5087d5c&p_p_id=site-browser&p_p_action=1&p_p_state=maximized&_site_browser_struts_action=%2Fext%2Ffolders%2Forder_menu&startLevel=1&depth=2&pagePath=/about-us/index&hostId=48190c8c-42c4-46af-8d1a-0cd5db894797';
        // const url = '/c/portal/layout?p_l_id=8660b482-1ef6-4d00-9459-3996e703ba19&p_p_id=site-browser&p_p_action=1&p_p_state=maximized&_site_browser_struts_action=%2Fext%2Ffolders%2Forder_menu&startLevel=1&depth=2&pagePath=/about-us/index&hostId=48190c8c-42c4-46af-8d1a-0cd5db894797';
        console.log('--url2', url2);

        DotCMSApi.page.emitCustomEvent('reorder-menu', url, 'ng-event');
    }

    render() {
        console.log('--site', this.context.site)
        const siteId = this.context.site ? this.context.site.identifier : '';
        const pageUrl = this.context.page ? this.context.page.pageURI : '';
        return <button onClick={() => this.emitEvent(siteId, pageUrl)} />;
    }
}

export default NavSort;
