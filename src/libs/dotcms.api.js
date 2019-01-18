const { login, isLogin, logout } = require('./dotcms.auth');
const fetch = require('node-fetch');

const getUrl = pathname => {
    const host = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_DEFAULT_HOST : '';
    return `${host}/api/v1/page/json/${pathname.slice(1)}?language_id=1`;
};

const translate = page => {
    page.layout.body.rows.forEach(row => {
        row.columns.forEach(col => {
            col.containers = col.containers.map(container => {
                return {
                    ...container,
                    ...page.containers[container.identifier].container,
                    acceptTypes: page.containers[container.identifier].containerStructures
                        .map(structure => structure.contentTypeVar)
                        .join(','),
                    contentlets: page.containers[container.identifier].contentlets[`uuid-${container.uuid}`]
                };
            });
        });
    });
    return page;
};

const request = ({ url, method }) => {
    return fetch(url, {
        method: method || 'GET',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        }
    });
};

const get = async ({ pathname }) => {
    const url = getUrl(pathname);

    return request({ url })
        .then(data => {
            if (data.ok) {
                return data.json();
            } else {
                return data;
            }
        })
        .then(data => {
            if (data.entity) {
                return data.entity.layout ? translate(data.entity) : {};
            }
            throw new Error(data.status);
        })
        .catch(err => {
            throw new Error(err.message);
            
        });
};

const emitNavigationEnd = pathname => {
    const customEvent = window.top.document.createEvent('CustomEvent');
    customEvent.initCustomEvent('ng-event', false, false, {
        name: 'remote-render-edit',
        data: {
            pathname
        }
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
        emitNavigationEnd
    },
    request
};
