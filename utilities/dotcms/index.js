const dotCMSApi = require('../../config/dotcmsApi');
const { loggerLog } = require('../logger');
const path = require('path');
const fetch = require('isomorphic-fetch');
const { printError } = require('../../cli/print');
import CustomError from '../custom-error'
import {
    DOTCMS_DOWN,
    DOTCMS_NO_LAYOUT,
    DOTCMS_NO_AUTH,
    DOTCMS_CUSTOM_ERROR,
    LANG_COOKIE_NAME
} from './constants';

async function getPage(url, lang) {
    loggerLog('DOTCMS PAGE', url, lang || '1');
    return dotCMSApi.page
        .get({
            url: url,
            language: lang || 1
        })
        .then(async (pageRender) => {
            /*
                If the page doesn't have a layout this transformPage function
                will throw an error.
            */
            const transformedPage = await transformPage(pageRender);
            return transformedPage;
        })
        .catch((error) => {
            /* 
                Error coming from the DotCMS server when DotCMS instance is down or not accesible
            */
            if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                error.statusCode = errors.DOTCMS_DOWN;
                error.message = 'DotCMS: instance is not running or inaccessible';
            }
            /* 
                Error coming from the DotCMS server when the authorization failed
            */
            if (error.statusCode === 401) {
                error.statusCode = errors.DOTCMS_NO_AUTH;
                error.message = 'DotCMS: Invalid User';
            }

            throw error;
        });
}

async function getNav(depth) {
    loggerLog('DOTCMS NAV');
    const nav = await dotCMSApi.nav.get(depth).then(({ children }) => children);

    const finalNav = [
        {
            href: '/index',
            title: 'Home',
            children: [],
            folder: false,
            hash: 'home'
        },
        ...nav
    ];
    return finalNav;
}

function getLanguages() {
    return dotCMSApi.language.getLanguages();
}

function proxyToStaticFile(req, res, next) {
    let proxyOptions;

    if (isAPIRequest(req.url)) {
        loggerLog('DOTCMS PROXY API REQUEST', req.url);
        loggerLog(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${req.url}`);
        proxyOptions = {
            proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
                proxyReqOpts.headers = {
                    ['Authorization']: `Bearer ${process.env.BEARER_TOKEN}`,
                    ['Content-Type']: 'application/json'
                };
                return proxyReqOpts;
            }
        };
    } else {
        loggerLog('DOTCMS PROXY', req.url);
    }

    // return proxy(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}${req.url}`, proxyOptions)(req, res, next);
}

function emitRemoteRenderEdit(url) {
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}


function isAPIRequest(url) {
    return url.startsWith('/api');
}
function isDotCMSAsset(url) {
    return url.startsWith('/contentAsset/') || url.startsWith('/dA/');
}

function isHtmlOrFolder(url) {
    const ext = path.parse(url).ext;
    return ext.length === 0 || ext === '.html';
}

function isPage(url) {
    return !isDotCMSAsset(url) && !isAPIRequest(url) && isHtmlOrFolder(url);
}

function getCookie(cookies, name) {
    if (cookies) {
        const match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : '';
    }

    return '';
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

const getPageList = async () => {
    const NOT_BUILD_THIS_PAGES = ['/store/product-line', '/store/product-detail', '/store/cart'];

    const PAGES_QUERY = {
        query: `{ 
            search(query: "+(urlmap:/store/* OR (basetype:5 AND path:/store/*))") {
                urlMap
                ... on htmlpageasset {
                    url
                }
            }
        }`
    };

    let data = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/v1/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        },
        body: JSON.stringify(PAGES_QUERY)
    });

    ({ data } = await data.json());

    const paths = data.search
        .filter(({ urlMap, url }) => urlMap || url)
        .map(({ urlMap, url }) => urlMap || url)
        .filter((url) => !NOT_BUILD_THIS_PAGES.includes(url));

    return paths;
};

const getToken = ({ user, password, expirationDays, host }) => {
    return dotcmsApi.auth
        .getToken({ user, password, expirationDays, host })
        .then((res) => res)
        .catch((err) => {
            if (err.status === 400 || err.status === 401) {
                console.log('\n');
                printError(err.message);
                return;
            }
            throw err;
        });
};

const getTagsListForCategory = async (category) => {
    const data = {
        query: {
            query_string: {
                query: `+contentType:product +categories:${category}`
            }
        },
        aggs: {
            tag: {
                terms: {
                    field: 'tags',
                    size: 100
                }
            }
        },
        size: 0
    };

    const options = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let results = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/es/search`, options);
    results = await results.json();
    return results.esresponse[0].aggregations['sterms#tag'].buckets;
};

function hasLayout(page) {
    return page.layout && page.layout.body;
}

function getAcceptTypes(containers, identifier) {
    // TODO: we can't calculate accept types like this because when the container is empty there is nothing in the containerStructures.
    return containers[identifier].containerStructures
        .map((structure) => structure.contentTypeVar)
        .join(',');
}

function hasSidebar(page) {
    return (
        page.layout.sidebar &&
        page.layout.sidebar.containers &&
        page.layout.sidebar.containers.length
    );
}

async function getUpdatedContainer(page, container) {
    const types = ['WIDGET'];
    const contentlets = page.containers[container.identifier].contentlets[`uuid-${container.uuid}`];

    for (let i = 0; i < contentlets.length; i++) {
        const contentlet = contentlets[i];

        if (types.includes(contentlet.baseType)) {
            contentlet.rendered = await dotCMSApi.widget
                .getHtml(contentlet.identifier)
                .then((html) => html)
                .catch(() => {
                    return 'Widget was not found';
                });
        }
    }

    return {
        ...container,
        ...page.containers[container.identifier].container,
        acceptTypes: getAcceptTypes(page.containers, container.identifier),
        contentlets: contentlets
    };
}

function getContainers(containers, page) {
    return containers.map((container) => getUpdatedContainer(page, container));
}

async function getColumns(row, page) {
    return Promise.all(
        row.columns.map(async (column) => {
            return {
                ...column,
                containers: await Promise.all(getContainers(column.containers, page))
            };
        })
    );
}

async function getRows(page) {
    return await Promise.all(
        page.layout.body.rows.map(async (row) => {
            return {
                ...row,
                columns: await getColumns(row, page)
            };
        })
    );
}

async function transformPage(page) {
    try {
        if (hasLayout(page)) {
            page.layout.body.rows = await getRows(page);

            if (hasSidebar(page)) {
                page.layout.sidebar.containers = await Promise.all(
                    getContainers(page.layout.sidebar.containers, page)
                );
            }

            return page;
        } else {
            throw new CustomError(
                `This page doesn't have a layout to render`,
                errors.DOTCMS_NO_LAYOUT
            );
        }
    } catch (error) {
        throw error instanceof CustomError ? error : new CustomError(error.message);
    }
}

module.exports = {
    isAPIRequest,
    CustomError,
    getCookie,
    setCookie,
    LANG_COOKIE_NAME,
    getPage,
    getNav,
    isPage,
    proxyToStaticFile,
    emitRemoteRenderEdit,
    getLanguages,
    errors: { DOTCMS_DOWN, DOTCMS_NO_LAYOUT, DOTCMS_NO_AUTH, DOTCMS_CUSTOM_ERROR },
    getToken,
    transformPage,
    getTagsListForCategory,
    getPageList
};
