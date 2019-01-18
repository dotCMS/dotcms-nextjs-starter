import React from 'react';
import { Alert } from 'reactstrap';

const CantRender = (props) => {
    return (
        <Alert className="alert" color={props.color || 'danger'}>
            <h4 className="alert-heading">{props.title}</h4>
            {props.children}
        </Alert>
    );
};

export default CantRender;