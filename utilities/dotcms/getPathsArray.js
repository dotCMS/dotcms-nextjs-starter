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

const getPathsArray = (pageList) => {
    const paths = pageList.reduce((acc, url) => {
        let urlArr = url.split('/').filter(Boolean);
        acc = [...acc, getParamsObjectForPath(urlArr, url)];
        return acc;
    }, []);

    // Due to how optional catch-all works, we need to pass an empty slug to generate index.html
    return paths.concat({ params: { slug: [''] } });
};

module.exports = getPathsArray;
