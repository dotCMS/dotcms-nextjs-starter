import DotCMSApi from './dotcms.api';

const getEsQuery = (
    contentType,
    { languageId, sortResultsBy, sortOrder1, offset, pagination, itemsPerPage, numberOfResults }
) => {
    let query = `{
        "query": {
            "bool": {
                "must": {
                    "query_string" : {
                        "query" : "+contentType:CONTENTTYPE +languageId:LANGUAGEIDVALUE"
                    }
                }
            }
        },
        "sort" : [
            { "SORTBYVALUE" : {"order" : "SORTTYPEVALUE"}}
        ],
        "from": OFFSETVALUE,
        "size": SIZEPERPAGE
    }`;

    const esParams = {
        CONTENTTYPE: contentType,
        LANGUAGEIDVALUE: languageId || '1',
        SORTBYVALUE: sortResultsBy,
        SORTTYPEVALUE: sortOrder1 || 'asc',
        OFFSETVALUE: offset || '0',
        SIZEPERPAGE: pagination ? itemsPerPage || 20 : numberOfResults || 40
    };

    Object.keys(esParams).forEach(key => {
        query = query.replace(key, esParams[key]);
    });
    return query;
};

export const esSearch = (
    contentType,
    { languageId, sortResultsBy, sortOrder1, offset, pagination, itemsPerPage, numberOfResults }
) => {
    return DotCMSApi.request({
        url: '/api/es/search',
        method: 'POST',
        body: getEsQuery(contentType, {
            languageId,
            sortResultsBy,
            sortOrder1,
            offset,
            pagination,
            itemsPerPage,
            numberOfResults
        })
    });
};
