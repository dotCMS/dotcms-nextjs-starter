const { login, isLogin, logout } = require('./dotcms.auth');
const { getCurrentSite } = require('./dotcms.sites');
const fetch = require('node-fetch');

const getUrl = pathname => {
    const host =
        process.env.NODE_ENV !== 'development'
            ? process.env.REACT_APP_DEFAULT_HOST
            : '';
    return `${host}/api/v1/page/json/${pathname.slice(1)}?language_id=1`;
};

const translate = page => {
    page.layout.body.rows.forEach(row => {
        row.columns.forEach(col => {
            col.containers = col.containers.map(container => {
                return {
                    ...container,
                    ...page.containers[container.identifier].container,
                    acceptTypes: page.containers[
                        container.identifier
                    ].containerStructures
                        .map(structure => structure.contentTypeVar)
                        .join(','),
                    contentlets:
                        page.containers[container.identifier].contentlets[
                            `uuid-${container.uuid}`
                        ]
                };
            });
        });
    });
    return page;
};

const request = ({ url, method, body }) => {
    return fetch(url, {
        method: method || 'GET',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
            'Content-type': 'application/json'
        },
        body: body
    });
};

const fillESQuery = (query, fetchParams) => {
    Object.keys(fetchParams).forEach(key => {
        query = query.replace(key, fetchParams[key]);
    });
    return query;
};

const esSearch = (contentType, params) => {
    const url = '/api/es/search';
    const queryTemplate = `{
        "query": {
            "bool": {
                "must": {
                    "query_string" : {
                        "query" : "+contentType:${contentType} +languageId:LANGUAGEIDVALUE"
                    }
                }
            }
        },
        "sort" : [
            { "SORTBYVALUE" : {"order" : "SORTTYPEVALUE"}}
        ],
        "from": OFFSETVALUE,
        "size": SIZEPERPAGE
    }}`;

    const fetchParams = {
        LANGUAGEIDVALUE: params.LANGUAGEIDVALUE ? params.LANGUAGEIDVALUE : '1',
        SORTBYVALUE: params.SORTBYVALUE ? params.SORTBYVALUE : 'title',
        SORTTYPEVALUE: params.SORTTYPEVALUE ? params.SORTTYPEVALUE : 'asc',
        OFFSETVALUE: params.OFFSETVALUE ? params.OFFSETVALUE : '0',
        SIZEPERPAGE: params.PAGINATION
            ? params.SIZEPERPAGE
                ? params.SIZEPERPAGE
                : 20
            : params.NUMBEROFRESULTS
            ? params.NUMBEROFRESULTS
            : 40
    };

    const query = fillESQuery(queryTemplate, fetchParams);
    return request({
        url: url,
        method: 'POST',
        body: query
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
            return {
                error: err.message
            };
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
    sites: {
        getCurrentSite
    },
    esSearch,
    request
};
