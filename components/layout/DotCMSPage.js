import { getComponent } from '../content-types/mapContentTypes';
import RowContainer from './RowContainer';
import PageContext from '../../contexts/PageContext';
import Layout from '../layout/Layout';

const Grid = ({ body }) => {
    return body && body.rows ? (
        body.rows.map((row, i) => (
            <section key={i} id={`section-${i + 1}`} className={`section ${row.styleClass || ''}`}>
                <RowContainer row={row} />
            </section>
        ))
    ) : (
        <h1>No body present in this page</h1>
    );
};

const DotCMSPage = ({ pageRender, isEditMode, nav }) => {
    const contentMap = pageRender?.urlContentMap;
    let SinglePage;

    if (contentMap) {
        SinglePage = getComponent(`${contentMap.contentType}Single`);
    }

    const body = pageRender?.layout?.body;

    return (
        <PageContext.Provider
            value={{
                isEditMode,
                nav,
                language: {
                    current: '1', // needs to make this dynamic, check _app.js
                    set: () => {}
                }
            }}
        >
            {pageRender?.layout ? (
                <Layout {...pageRender?.layout}>
                    {contentMap ? <SinglePage {...contentMap} /> : <Grid body={body} />}
                </Layout>
            ) : (
                <h1>No layout in this page</h1>
            )}
        </PageContext.Provider>
    );
};

export default DotCMSPage;
