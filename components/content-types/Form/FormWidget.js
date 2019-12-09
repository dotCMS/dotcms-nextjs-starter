import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

function getFormVariableFromContent(renderedContent) {
    return renderedContent.match(/variable='[^']+('*)/g)[0].split("'")[1];
}

const FormWidget = ({ formId, rendered }) => {
    const [items, setItems] = useState([]);
    let variable;

    if (rendered) {
        variable = getFormVariableFromContent(rendered);
    }

    useEffect(() => {
        dotCMSApi
            .form({ identifier: formId })
            .get()
            .then(({ fields }) => {
                const layout = fields.map((item) => {
                    return { columns: [{ fields: [item] }] };
                });
                setItems(layout);
            });
    }, [formId]);

    return items.length ? <Form layout={items} variable={variable} /> : '';
};

FormWidget.propTypes = {
    formId: PropTypes.string.isRequired,
    rendered: PropTypes.string
};

export default FormWidget;
