import React from 'react';
import { getComponent } from '../content-types/mapContentTypes';
import PageContext from '../../contexts/PageContext';
import Layout from '../layout/Layout';
import LayoutGrid from './LayoutGrid';

const DotCMSPage = ({ pageRender, nav, isEditMode }) => {
    let DetailPage;

    if (pageRender?.urlContentMap) {
        const { urlContentMap } = pageRender;
        DetailPage = getComponent(`${urlContentMap.contentType}Detail`);
    }

    const contextValue = {
        isEditMode,
        nav,
        pageRender
    };

    return (
        <PageContext.Provider value={contextValue}>
            {pageRender?.layout ? (
                <Layout>{DetailPage ? <DetailPage pageRender={pageRender} /> : <LayoutGrid />}</Layout>
            ) : (
                <h1>No layout in this page</h1>
            )}
        </PageContext.Provider>
    );
};

export default DotCMSPage;
