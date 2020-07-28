const dotCMSApi = require('../../config/dotcmsApi');
const { loggerLog } = require('../logger');
const { printError } = require('../../cli/print');
const fetch = require('isomorphic-fetch');
const CustomError = require('../custom-error');
const transformPage = require('./transformPage');
const { DOTCMS_DOWN, DOTCMS_NO_AUTH, LANG_COOKIE_NAME } = require('./constants');

const getLanguages = () => {
    return dotCMSApi.language.getLanguages();
};

async function getPage(url, lang) {
    if (process.env.NODE_ENV !== 'production') {
        // loggerLog('DOTCMS PAGE', url, lang || '1');
    }
    return dotCMSApi.page
        .get({ url, language: lang })
        .then(async (pageRender) => {
            /*
                If the page doesn't have a layout this transformPage function
                will throw an error.
            */
            return await transformPage(pageRender);
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

async function getNav(depth, location = '/') {
    if (process.env.NODE_ENV !== 'production') {
        loggerLog('DOTCMS NAV');
    }

    const nav = await dotCMSApi.nav.get(depth, location).then(({ children }) => children);
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

/*
 * Determines if the path ends with /index but only when the / is preceded by a word
 *
 * This is needed to create the right paths for Next.js getStaticPaths' paths array
 * `/destinations/index` becomes `/destinations`
 *
 * @param {string} str - the path (e.g /destinations/index)
 */
const pathEndsWithIndex = (str) => {
    const r = /(?<=\w)(\/index)/;
    return r.test(str);
};

const getParamsObjectForPath = (pathArray, url) => {
    return {
        params: {
            slug: pathEndsWithIndex(url)
                ? pathArray.splice(0, pathArray.indexOf('index'))
                : pathArray
        }
    };
};

const getPathsArray = (pageList, languages = []) => {
    languages = languages
        .map((language) => language.languageCode)
        .filter((language) => language !== process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE);

    const paths = pageList.reduce((acc, url) => {
        let urlArr = url.split('/').filter(Boolean);
        acc = [...acc, getParamsObjectForPath(urlArr, url)];
        return acc;
    }, []);

    // Due to how optional catch-all works, we need to pass an empty slug to generate index.html
    return paths.concat({ params: { slug: [''] } });
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

export const getLanguagesProps = async (selectedLanguage = "") => {

        // Fetch list of languages supported in the DotCMS instance so we can inject the data into the static pages
        // and map to a clean array of ISO compatible lang codes.
        let languages = await getLanguages();
        let results;

        // Returns either true or false if `selectedLanguage` in a valid language from our languages array
        let hasLanguages = languages
            .map((language) => language.languageCode)
            .filter((language) => language !== process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE)
            .includes(selectedLanguage);

        // If the hasLanguages predicate returns true find the language in the languages array and pass it in `getPage` call
        const languageId = hasLanguages
            ? languages.find((lang) => lang.languageCode === selectedLanguage)?.id
            : '1';

        results = {
            hasLanguages,
            languageId,
            languages
        };

        if (hasLanguages) {
            results = {
                ...results,
                selectedLanguage
            };
        }

        return results;
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
    getPathsArray,
    getLanguages,
    getLanguagesProps
};
