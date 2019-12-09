import React from 'react';
import reactifyWc from 'reactify-wc';
import PropTypes from 'prop-types';

const DotFormWC = reactifyWc('dot-form');

if (process.browser) {
    import('dotcms-field-elements/dist/loader').then((module) => {
        module.defineCustomElements(window);
    });
}

const Forms = ({ layout, variable }) => {
    return <DotFormWC variable={variable} layout={layout}></DotFormWC>;
};

Forms.propTypes = {
    layout: PropTypes.arrayOf(
        PropTypes.shape({
            columns: PropTypes.arrayOf(
                PropTypes.shape({
                    fields: PropTypes.arrayOf(
                        PropTypes.shape({
                            clazz: PropTypes.string.isRequired,
                            contentTypeId: PropTypes.string.isRequired,
                            dataType: PropTypes.string.isRequired,
                            fieldContentTypeProperties: PropTypes.array,
                            fieldType: PropTypes.string.isRequired,
                            fieldTypeLabel: PropTypes.string.isRequired,
                            fieldVariables: PropTypes.array.isRequired,
                            fixed: PropTypes.bool.isRequired,
                            iDate: PropTypes.number.isRequired,
                            id: PropTypes.string.isRequired,
                            indexed: PropTypes.bool.isRequired,
                            listed: PropTypes.bool.isRequired,
                            modDate: PropTypes.number.isRequired,
                            name: PropTypes.string.isRequired,
                            readOnly: PropTypes.bool.isRequired,
                            required: PropTypes.bool.isRequired,
                            searchable: PropTypes.bool.isRequired,
                            skipRelationshipCreation: PropTypes.bool.isRequired,
                            sortOrder: PropTypes.number.isRequired,
                            unique: PropTypes.bool.isRequired,
                            variable: PropTypes.string.isRequired
                        })
                    )
                })
            )
        })
    ).isRequired,
    variable: PropTypes.string.isRequired
};

export default Forms;
