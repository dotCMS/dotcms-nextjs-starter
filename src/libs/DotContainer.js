import React from 'react';

const DotContainer = (props) => {
    const data = props.data;

    return (
        <div
            data-dot-object="container"
            data-dot-inode={data.inode}
            data-dot-identifier={data.identifier}
            data-dot-uuid={data.uuid}
            data-max-contentlets={data.maxContentlets}
            data-dot-accept-types={data.acceptTypes}
            data-dot-can-add="CONTENT,FORM,WIDGET">
            {props.children}
        </div>
    )
};

export default DotContainer;
