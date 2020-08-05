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

function getUpdatedContainer(page, container) {
    const uuid = `uuid-${container.uuid}`;
    const contentlets = page.containers[container.identifier].contentlets[uuid];

    for (let i = 0; i < contentlets.length; i++) {
        const contentlet = contentlets[i];
        contentlet.rendered = page.containers[container.identifier].rendered[uuid];
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

function getColumns(row, page) {
    return row.columns.map((column) => {
        return {
            ...column,
            containers: getContainers(column.containers, page)
        };
    });
}

function getRows(page) {
    return page.layout.body.rows.map((row) => {
        return {
            ...row,
            columns: getColumns(row, page)
        };
    });
}

/**
 * Merge the page containers and components into the layout property
 * for easy render of react components
 *
 */
function transformPage(page) {
    try {
        if (hasLayout(page)) {
            let transformedPage = {
                ...page,
                layout: {
                    ...page.layout,
                    body: {
                        ...page.layout.body,
                        rows: getRows(page)
                    }
                }
            };

            if (hasSidebar(page)) {
                const containers = getContainers(page.layout.sidebar.containers, page);

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
