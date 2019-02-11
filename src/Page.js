import React from 'react';
import RowContainer from './Components/RowContainer';
import CantRender from './Components/CantRender';

const Page = ({ body }) => {
    return body && body.rows ? (
        body.rows.map((row, i) => {
            return <RowContainer row={row} key={i} />;
        })
    ) : (
        <CantRender title="Page can not be rendered">
            <p>
                You might not have enterprise license or the page is not created with our layout
                editor.
            </p>
        </CantRender>
    );
};

export default Page;
