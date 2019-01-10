const fetch = require('node-fetch');

const processPage = (page) => {
    page.layout.body.rows.forEach(row => {
        row.columns.forEach(col => {
            col.containers = col.containers.map(container => {
                return {
                    ...container,
                    ...page.containers[container.identifier].container,
                    acceptTypes: page.containers[container.identifier].containerStructures.map(structure => structure.contentTypeVar).join(','),
                    contentlets: page.containers[container.identifier].contentlets[`uuid-${container.uuid}`]
                };
            });
        });
    });
    return page;
}

export default {
    processPage: processPage,
    getPage: async ({includeHost, pathname}) => {
        // TODO: we need to pass dinamically the lagunage_id and the host
        const url = `${includeHost ? process.env.REACT_APP_DEFAULT_HOST : ''}/api/v1/page/json/${pathname.slice(1)}?language_id=1`;

        return await fetch(url, {
            headers: {
                DOTAUTH: Buffer.from(`${process.env.REACT_APP_USER_EMAIL}:${process.env.REACT_APP_USER_PASSWORD}`).toString('base64')
            }
        })
            .then(data => data.json())
            .then(data => data.entity)
            .then(page => {
                return processPage(page);
            })
            .catch(err => err);
    }
};
