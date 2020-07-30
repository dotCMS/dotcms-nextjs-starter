import React from 'react';
import getPageComponent from '../../../utilities/dotcms/getPageComponent';
import PageContext from '../../../contexts/PageContext';
import Layout from './Layout';
import LayoutGrid from './LayoutGrid';

const DotCMSPage = ({ pageRender, nav, isEditMode, languageProps }) => {
    let DetailPage;

    if (pageRender?.urlContentMap) {
        const { urlContentMap } = pageRender;
        DetailPage = getPageComponent(urlContentMap.contentType);
    }

    const contextValue = {
        isEditMode,
        nav,
        pageRender,
        languageProps
    };

    // When the page is generating during request (for example `/store/category-tag` pages) we don't want to show anything.
    if (typeof pageRender === 'undefined') return null;

    return (
        <PageContext.Provider value={contextValue}>
            {pageRender?.layout ? (
                <Layout>{DetailPage ? <DetailPage /> : <LayoutGrid />}</Layout>
            ) : (
                <h1>No layout in this page</h1>
            )}
        </PageContext.Provider>
    );
};

export default DotCMSPage;
