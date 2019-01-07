import React from 'react';
import { Container as BootstrapContainer, Alert } from 'reactstrap';

import RowContainer from './Components/RowContainer';

import './Page.css';

const Page = ({ data }) => {
    return (
        <BootstrapContainer>
            {data && data.body && data.body.rows ? (
                data.body.rows.map((row, i) => {
                    return <RowContainer row={row} key={i} />;
                })
            ) : (
                <Alert className="alert" color="danger">
                    <h4 className="alert-heading">Page can't be rendered</h4>
                    <p>You might not have enterprise license or the page is not created with our layout editor.</p>
                </Alert>
            )}
        </BootstrapContainer>
    );
};

export default Page;
