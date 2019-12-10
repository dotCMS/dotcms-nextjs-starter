import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

const FormWidget = ({ formId }) => {
    const [state, setState] = useState({});

    useEffect(() => {
        dotCMSApi
            .form({ identifier: formId })
            .get()
            .then(({ layout, variable }) => {
                setState({
                    layout,
                    variable
                });
            });
    }, [formId]);

    return state.layout && state.variable ? <Form {...state} /> : '';
};

FormWidget.propTypes = {
    formId: PropTypes.string.isRequired
};

export default FormWidget;
