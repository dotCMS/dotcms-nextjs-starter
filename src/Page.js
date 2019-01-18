import React from 'react';

import RowContainer from './Components/RowContainer';
import CantRender from './Components/CantRender';

import './Page.css';



const Page = ({ data }) => {
    return data && data.body && data.body.rows ? (
        data.body.rows.map((row, i) => {
            return <RowContainer row={row} key={i} />;
        })
    ) : (
        <CantRender title="Page can not be rendered">
            <p>You might not have enterprise license or the page is not created with our layout editor.</p>
        </CantRender>
    );
};

export default Page;
