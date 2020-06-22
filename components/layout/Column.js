import React from 'react'

const Column = (props) => {
    const {
        md: { size: colSize, offset }
    } = props;
    return <div className={`col-md-${colSize} offset-md-${offset}`}>{props.children}</div>;
};

export default Column
