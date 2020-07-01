import { getComponent } from '../content-types/mapContentTypes';
import PageContext from '../../contexts/PageContext';
import Layout from '../layout/Layout';
import LayoutGrid from './LayoutGrid';
import { loggerPageRender } from '../../utilities/logger'
const DotCMSPage = ({ pageRender, isEditMode, nav }) => {
    const contentMap = pageRender?.urlContentMap;
    let SinglePage;

    //if(typeof(window) !== "undefined") loggerPageRender(pageRender);

    if (contentMap) {
        SinglePage = getComponent(`${contentMap.contentType}Single`);
    }

    const contextValue = {
        isEditMode,
        nav,
        language: {
            current: '1', // needs to make this dynamic, check _app.js
            set: () => {}
        }
    };

    return (
        <PageContext.Provider value={contextValue}>
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
