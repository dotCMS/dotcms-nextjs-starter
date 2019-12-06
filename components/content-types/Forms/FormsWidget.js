import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Forms from './Forms';
const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

const FormsWidget = ({ formId, rendered }) => {
    const [items, setItems] = useState([]);
    let variable;

    if (rendered) {
        variable = rendered.match(/variable='[^']+('*)/g)[0].split("'")[1];
    }

    useEffect(() => {
        if (!items.length) {
            dotCMSApi
                .form({ identifier: formId })
                .get()
                .then(({ fields }) => {
                    const layout = fields.map((item) => {
                        return { columns: [{ fields: [item] }] };
                    });
                    setItems(layout);
                });
        }
    });

    return items.length ? <Forms layout={items} variable={variable} /> : '';
};

FormsWidget.propTypes = {
    formId: PropTypes.string.isRequired,
    rendered: PropTypes.string
};

export default FormsWidget;
