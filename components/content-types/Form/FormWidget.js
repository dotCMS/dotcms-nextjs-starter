import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

const FormWidget = ({ formId }) => {
    const [items, setItems] = useState([]);
    const [formVariable, setFormVariable] = useState('');

    useEffect(() => {
        dotCMSApi
            .form({ identifier: formId })
            .get()
            .then(({ fields, variable }) => {
                const layout = fields.map((item) => {
                    return { columns: [{ fields: [item] }] };
                });
                setItems(layout);
                setFormVariable(variable);
            });
    }, [formId]);

    return items.length && formVariable ? <Form layout={items} variable={formVariable} /> : '';
};

FormWidget.propTypes = {
    formId: PropTypes.string.isRequired
};

export default FormWidget;
