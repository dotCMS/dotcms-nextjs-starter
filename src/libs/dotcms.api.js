const fetch = require('node-fetch');

export default {
    getPage: async (pathname) => {
        return await fetch(`http://localhost:8080/api/v1/page/render/${pathname}?language_id=1`, {
            headers: {
                DOTAUTH: Buffer.from(`admin@dotcms.com:admin`).toString('base64')
            }
        })
            .then(data => data.json())
            .then(data => data.entity)
            .then(page => {
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
            })
            .then(data => {
                return {
                    body: data.layout.body
                };
            })
            .catch(err => err);
    }
};
