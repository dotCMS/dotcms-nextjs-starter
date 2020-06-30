import { getComponent } from '../content-types/mapContentTypes';
import PageContext from '../../contexts/PageContext';
import Layout from '../layout/Layout';
import LayoutGrid from './LayoutGrid';

const DotCMSPage = ({ pageRender, isEditMode, nav }) => {
    const contentMap = pageRender?.urlContentMap;
    let SinglePage;

    if (contentMap) {
        SinglePage = getComponent(`${contentMap.contentType}Single`);
    }

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
                    {SinglePage ? (
                        <SinglePage {...contentMap} />
                    ) : (
                        <LayoutGrid body={pageRender?.layout?.body} />
                    )}
                </Layout>
            ) : (
                <h1>No layout in this page</h1>
            )}
        </PageContext.Provider>
    );
};

export default DotCMSPage;
