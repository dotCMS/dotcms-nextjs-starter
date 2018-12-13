const fetch = require('node-fetch');

const processPage = (page) => {
    page.layout.body.rows.forEach(row => {
        row.columns.forEach(col => {
            col.containers = col.containers.map(container => {
                return {
                    ...container,
                    contentlets: page.containers[container.identifier].contentlets[`uuid-${container.uuid}`]
                };
            });
        });
    });
    return page;
}

export default {
    processPage: processPage,
    getPage: async (pathname) => {
        // TODO: we need to pass dinamically the lagunage_id and the host
        return await fetch(`http://localhost:8080/api/v1/page/render/${pathname.slice(1)}?language_id=1`, {
            headers: {
                DOTAUTH: Buffer.from(`admin@dotcms.com:admin`).toString('base64')
            }
        })
            .then(data => data.json())
            .then(data => data.entity)
            .then(page => processPage(page))
            .catch(err => err);
    }
};
