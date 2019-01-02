import React from 'react';

const DotContainer = (props) => {
    const data = props.data;
    return (
        <div
            data-dot-accept-types="Document,Blog,webPageContent,Products,News,Media,calendarEvent,Location,WIDGET,FORM"
            data-dot-object="container"
            data-dot-inode={data.inode}
            data-dot-identifier={data.identifier}
            data-dot-uuid={data.uuid}
            data-max-contentlets={data.maxContentlets}
            data-dot-can-add="CONTENT,FORM,WIDGET">
            {props.children}
        </div>
    )
};

export default DotContainer;
