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

import PageContext from '../../context/PageContext';

const Contentlets = ({ contentlets }) => {
    return contentlets ? (
        <PageContext.Consumer>
            {({ isEditMode }) => {
                return contentlets.map(contentlet => {
                    contentlet.dotCanEdit = true;
                    return isEditMode ? (
                        <DotCMSEditContentletWrapper key={contentlet.identifier} contentlet={contentlet}>
                            <Contentlet data={contentlet} />
                        </DotCMSEditContentletWrapper>
                    ) : (
                        <Contentlet key={contentlet.identifier} data={contentlet} />
                    );
                });
            }}
        </PageContext.Consumer>
    ) : null;
};

export default function Container({ container }) {
    return (
        <PageContext.Consumer>
            {({ isEditMode }) =>
                isEditMode ? (
                    <DotCMSEditContainerWrapper container={container}>
                        <Contentlets {...container} />
                    </DotCMSEditContainerWrapper>
                ) : (
                    <Contentlets {...container} />
                )
            }
        </PageContext.Consumer>
    );
}
