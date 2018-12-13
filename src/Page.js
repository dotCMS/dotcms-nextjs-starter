import React from 'react';
import './Page.css';
import Row from './Row';

const Page = ({data}) => {
    return (
        <div className="Page">
            {data.body.rows.map((row, i) => {
                return <Row row={row} key={i} />;
            })}
        </div>
    );
};

export default Page;
