import React from 'react';
import Column from './Column';

const Row = ({row}) => {
    return (
        <div className="row">
            {row.columns.map((col, k) => {
                return (
                    <Column col={col} key={k}></Column>
                );
            })}
        </div>
    )
};

export default Row;
