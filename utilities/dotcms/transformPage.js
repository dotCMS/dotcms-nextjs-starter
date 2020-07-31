const dotCMSApi = require('../../config/dotcmsApi');

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

function hasLayout(page) {
    return page.layout && page.layout.body;
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

/**
 * Merge the page containers and components into the layout property
 * for easy render of react components
 *
 */
async function transformPage(page) {
    try {
        if (hasLayout(page)) {
            let transformedPage = {
                ...page,
                layout: {
                    ...page.layout,
                    body: {
                        ...page.layout.body,
                        rows: await getRows(page)
                    }
                }
            };

            if (hasSidebar(page)) {
                const containers = await Promise.all(
                    getContainers(page.layout.sidebar.containers, page)
                );

                transformedPage = {
                    ...transformedPage,
                    layout: {
                        ...page.layout,
                        sidebar: {
                            ...page.layout.sidebar,
                            containers
                        }
                    }
                };
            }

            return transformedPage;
        } else {
            throw new Error(`This page doesn't have a layout to render`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = transformPage;
