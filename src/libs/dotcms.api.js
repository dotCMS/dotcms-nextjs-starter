const { login, isLogin, logout } = require('./dotcms.auth');
const { getCurrentSite } = require('./dotcms.sites');
const { esSearch } = require('./dotcms.esSearch');
const fetch = require('node-fetch');
let languagesConf;
let language = {
    code: '',
    id: ''
};

const setLanguage = (pathname) => {
    language.code = pathname.split('/')[1];
    const langId = languagesConf.find((lang) => lang.languageCode === language.code);
    if (langId) {
        language.id = langId.id;
    } else {
        language.code = null;
        language.id = 1;
    }
    return language;
};

const getUrl = (pathname) => {
    if (language.code) {
        let pathnameSplitted = pathname.split('/');
        pathnameSplitted.splice(1, 1);
        pathname = pathnameSplitted.join('/');
    }
    const host = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_DOTCMS_HOST : '';
    return `${host}/api/v1/page/json/${pathname.slice(1)}?language_id=${language.id}`;
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

        if (
            page.layout.sidebar &&
            page.layout.sidebar.containers &&
            page.layout.sidebar.containers.length
        ) {
            page.layout.sidebar.containers = page.layout.sidebar.containers.map((container) => {
                const contentlets =
                    page.containers[container.identifier].contentlets[`uuid-${container.uuid}`];
                return {
                    ...container,
                    contentlets
                };
            });
        }
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

const emitCustomEvent = (eventName, eventData) => {
    const customEvent = window.top.document.createEvent('CustomEvent');
    customEvent.initCustomEvent('ng-event', false, false, {
        name: eventName,
        data: eventData
    });
    window.top.document.dispatchEvent(customEvent);
};

const getConfiguration = () => {
    return request({
        url: `${process.env.REACT_APP_DOTCMS_HOST}/api/v1/configuration`
    })
        .then((response) => response.json())
        .then((data) => {
            languagesConf = data.entity.languages;
            return data.entity;
        });
};

const getWidgetHtml = (identifier) => {
    return request({
        url: `${process.env.REACT_APP_DOTCMS_HOST}/api/widget/id/` + identifier
    }).then((response) => response.text());
};

export default {
    auth: {
        login,
        logout,
        isLogin
    },
    page: {
        emitCustomEvent,
        get,
        getWidgetHtml,
        setLanguage,
        translate
    },
    sites: {
        getCurrentSite
    },
    esSearch,
    getConfiguration,
    request
};
