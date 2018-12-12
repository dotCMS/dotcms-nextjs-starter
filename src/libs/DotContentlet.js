import React from 'react';

const DotContelet = (props) => {
    const data = props.data;
    return (
        <div
            data-dot-object="contentlet"
            data-dot-inode={data.inode} 
            data-dot-identifier={data.identifier} 
            data-dot-type={data.dotType}
            data-dot-basetype={data.dotBasetype}
            data-dot-lang={data.dotLang}
            data-dot-title={data.title}
            data-dot-can-edit={data.dotCanEdit || true}
            data-dot-content-type-id={data.dotContentTypeId} 
            data-dot-has-page-lang-version={data.dotHasPageLangVersion}>
            {props.children}
        </div>
    )
};

export default DotContelet;
