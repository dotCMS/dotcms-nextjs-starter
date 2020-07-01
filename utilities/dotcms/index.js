const dotCMSApi = require('../../config/dotcmsApi');
const { loggerLog } = require('../logger');
const { printError } = require('../../cli/print');
const fetch = require('isomorphic-fetch');
const CustomError = require('../custom-error');
const transformPage = require('./transformPage');

const { DOTCMS_DOWN, DOTCMS_NO_AUTH, LANG_COOKIE_NAME } = require('./constants');

async function getPage(url, lang) {
    if (process.env.NODE_ENV !== 'production') {
        loggerLog('DOTCMS PAGE', url, lang || '1');
    }
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
                error.statusCode = DOTCMS_DOWN;
                error.message = 'DotCMS: instance is not running or inaccessible';
            }
            /* 
                Error coming from the DotCMS server when the authorization failed
            */
            if (error.statusCode === 401) {
                error.statusCode = DOTCMS_NO_AUTH;
                error.message = 'DotCMS: Invalid Auth Token';
            }

            throw error;
        });
}

async function getNav(depth) {
    if (process.env.NODE_ENV !== 'production') {
        loggerLog('DOTCMS NAV');
    }

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

function emitRemoteRenderEdit(url) {
    console.log('emitting event');
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
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

const getToken = ({ user, password, expirationDays, host }) => {
    return dotCMSApi.auth
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

const getPathsArray = (res) => {
    const paths = res.reduce((acc, { url }) => {
        acc = [
            ...acc,
            {
                params: {
                    slug:
                        url &&
                        url.split('/').filter((item) => {
                            return item.length > 0 && item !== 'index';
                        })
                }
            }
        ];
        return acc;
    }, []);
    return paths;
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

module.exports = {
    CustomError,
    getCookie,
    setCookie,
    LANG_COOKIE_NAME,
    getPage,
    getNav,
    emitRemoteRenderEdit,
    getToken,
    getTagsListForCategory,
    getPathsArray
};
