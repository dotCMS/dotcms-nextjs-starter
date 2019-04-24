import React from 'react';

import { Row as BootstrapRow } from 'reactstrap';
import ColumnContainer from './ColumnContainer';

const calcColumnOffset = (prev, col) => {
    return prev ? col.left - (prev.width + prev.left) : null;
};

const getColumnsWithOffset = row => {
    return row.columns.reduce((acc, col) => {
        const prev = acc[acc.length - 1] || null;

        return acc.concat([
            {
                ...col,
                offset: calcColumnOffset(prev, col)
            }
        ]);
    }, []);
};

const RowContainer = ({ row }) => {
    const cols = getColumnsWithOffset(row);

    return (
        <BootstrapRow className={row.styleClass || ''}>
            {cols.map((col, k) => {
                return <ColumnContainer col={col} key={k} />;
            })}
        </BootstrapRow>
    );
};

export default RowContainer;
