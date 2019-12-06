import React, { useState, useEffect } from 'react';
import Forms from './Forms';
const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

const FormsWidget = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!items.length) {
            dotCMSApi
                .form({ identifier: props.formId })
                .get()
                .then(({ fields }) => {
                    const layout = fields.map((item) => {
                        return { columns: [{ fields: [item] }] };
                    });
                    setItems(layout);
                });
        }
    });

    return items.length ? <Forms layout={items} /> : '';
};

export default FormsWidget;
