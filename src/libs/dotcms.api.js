const { login, isLogin, logout } = require('./dotcms.auth');
const { getCurrentSite } = require('./dotcms.sites');
const { esSearch } = require('./dotcms.esSearch');
const fetch = require('node-fetch');

const getUrl = (pathname) => {
    const host = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_DOTCMS_HOST : '';
    return `${host}/api/v1/page/json/${pathname.slice(1)}?language_id=1`;
};

const translate = (page) => {
    if (page.layout) {
        page.layout.body.rows.forEach((row) => {
            row.columns.forEach((col) => {
                col.containers = col.containers.map((container) => {
                    return {
                        ...container,
                        ...page.containers[container.identifier].container,
                        acceptTypes: page.containers[container.identifier].containerStructures
                            .map((structure) => structure.contentTypeVar)
                            .join(','),
                        contentlets:
                            page.containers[container.identifier].contentlets[
                                `uuid-${container.uuid}`
                            ]
                    };
                });
            });
        });
    }

    return page;
};

const request = ({ url, method, body }) => {
    return fetch(url, {
        method: method || 'GET',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            'Content-type': 'application/json'
        },
        body: body
    });
};

const get = async ({ pathname }) => {
    const url = getUrl(pathname);

    return request({ url })
        .then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                return data;
            }
        })
        .then((data) => {
            if (data.entity) {
                return data.entity.layout ? translate(data.entity) : {};
            }
            throw new Error(data.status);
        })
        .catch((err) => {
            return {
                error: err.message
            };
        });
};

const emitCustomEvent = (eventName, eventData, eventType) => {
    console.log('--emitNgEvent', eventName, eventData, eventType);
    const customEvent = window.top.document.createEvent('CustomEvent');
    customEvent.initCustomEvent(eventType, false, false, {
        name: eventName,
        data: eventData
    });
    window.top.document.dispatchEvent(customEvent);
};

export default {
    auth: {
        login,
        logout,
        isLogin
    },
    page: {
        translate,
        get,
        emitCustomEvent
    },
    sites: {
        getCurrentSite
    },
    esSearch,
    request
};
