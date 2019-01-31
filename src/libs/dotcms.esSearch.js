import DotCMSApi from './dotcms.api';

const getEsQuery = (
    contentType,
    { languageId, sortResultsBy, sortOrder1, offset, pagination, itemsPerPage, numberOfResults, detailedSearchQuery }
) => {

    const paginationQuery = `,
        "from": OFFSETVALUE,
        "size": SIZEPERPAGE`;

    let query = `{
        "query": {
            "bool": {
                "must": {
                    "query_string" : {
                        "query" : "+contentType:CONTENTTYPE +languageId:LANGUAGEIDVALUE ${detailedSearchQuery || '' }"
                    }
                }
            }
        },
        "sort" : [
            { "SORTBYVALUE" : {"order" : "SORTTYPEVALUE"}}
        ]
        ${pagination || numberOfResults ? paginationQuery : ''}
    }`;

    const esParams = {
        CONTENTTYPE: contentType,
        LANGUAGEIDVALUE: languageId || '1',
        SORTBYVALUE: sortResultsBy || 'title_dotraw',
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
    { languageId, sortResultsBy, sortOrder1, offset, pagination, itemsPerPage, numberOfResults, detailedSearchQuery }
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
            numberOfResults,
            detailedSearchQuery
        })
    });
};
