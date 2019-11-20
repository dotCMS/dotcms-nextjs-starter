const dotCMSApi = require('./dotcmsApi');
const { errors, CustomError } = require('./utilities');

function haveLayout(page) {
    return page.layout && page.layout.body;
}

function getAcceptTypes(containers, identifier) {
    // TODO: we can't calculate accept types like this because when the container is empty there is nothing in the containerStructures.
    return containers[identifier].containerStructures
        .map(structure => structure.contentTypeVar)
        .join(',');
}

function itHaveSidebar(page) {
    return (
        page.layout.sidebar &&
        page.layout.sidebar.containers &&
        page.layout.sidebar.containers.length
    );
}

async function getUpdatedContainer(page, container) {
    const types = ['WIDGET'];
    const contentlets =
        page.containers[container.identifier].contentlets[
            `uuid-${container.uuid}`
        ];

    for (let i = 0; i < contentlets.length; i++) {
        const contentlet = contentlets[i];

        if (types.includes(contentlet.baseType)) {
            contentlet.rendered = await dotCMSApi.widget
                .getHtml(contentlet.identifier)
                .then(html => html)
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
    return containers.map(container => getUpdatedContainer(page, container));
}

async function getColumns(row, page) {
    return Promise.all(
        row.columns.map(async column => {
            return {
                ...column,
                containers: await Promise.all(
                    getContainers(column.containers, page)
                )
            };
        })
    );
}

async function getRows(page) {
    return await Promise.all(
        page.layout.body.rows.map(async row => {
            return {
                ...row,
                columns: await getColumns(row, page)
            };
        })
    );
}

async function transformPage(page) {
    try {
        if (haveLayout(page)) {
            page.layout.body.rows = await getRows(page);

            if (itHaveSidebar(page)) {
                page.layout.sidebar.containers = await Promise.all(
                    getContainers(page.layout.sidebar.containers, page)
                );
            }

            return page;
        } else {
            throw new CustomError(
                `This page doesn't have a layout to render`,
                errors.DOTCMS_NO_LAYOUT
            );
        }
    } catch (error) {
        throw error instanceof CustomError
            ? error
            : new CustomError(error.message);
    }
}

module.exports = transformPage;
