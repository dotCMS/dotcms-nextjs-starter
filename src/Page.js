import React from 'react';
import './Page.css';
import Row from './Row';

const Page = ({ data: { body } }) => {
    return (
        <div className="Page">
            {body.rows.map((row, i) => {
                return <Row row={row} key={i} />;
            })}
        </div>
    );
};

export default Page;
