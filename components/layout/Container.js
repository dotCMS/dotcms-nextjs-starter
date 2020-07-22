import React, { useContext } from 'react';
import PageContext from '../../contexts/PageContext';

import { Contentlet } from './Contentlet';
import reactifyWc from 'reactify-wc';

/*
React passes all data to Custom Elements in the form of HTML
attributes. For primitive data this is fine, but the system
breaks down when passing rich data, like objects or arrays. 
In these instances you end up with stringified values like
some-attr="[object Object]" which can't actually be used.

More info: https://github.com/facebook/react/issues/11347

Given this issue we use `reactify-wc` to make React works
with Web Components: https://www.npmjs.com/package/reactify-wc 
*/
const DotCMSEditContainerWrapper = reactifyWc('dotcms-ema-container');
const DotCMSEditContentletWrapper = reactifyWc('dotcms-ema-contentlet');

const ContentletWrapper = ({ children, contentlet, isEditMode }) => {
    if (isEditMode) {
        contentlet.dotCanEdit = true;
        return (
            <DotCMSEditContentletWrapper contentlet={contentlet}>
                {children}
            </DotCMSEditContentletWrapper>
        );
    }

    return <>{children}</>;
};

const ContainerWrapper = ({ children, container, isEditMode }) => {
    if (isEditMode) {
        return (
            <DotCMSEditContainerWrapper container={container}>
                {children}
            </DotCMSEditContainerWrapper>
        );
    }

    return <>{children}</>;
};

const Contentlets = ({ contentlets }) => {
    const { isEditMode } = useContext(PageContext);

    return contentlets.length ? (
        <>
            {contentlets.map((contentlet) => {
                return (
                    <ContentletWrapper
                        key={contentlet.identifier}
                        isEditMode={isEditMode}
                        contentlet={contentlet}
                    >
                        <Contentlet data={contentlet} />
                    </ContentletWrapper>
                );
            })}
        </>
    ) : null;
};

export default function ContentletContainer({ container }) {
    const { isEditMode } = useContext(PageContext);

    return (
        <ContainerWrapper isEditMode={isEditMode} container={container}>
            <Contentlets {...container} />
        </ContainerWrapper>
    );
}
