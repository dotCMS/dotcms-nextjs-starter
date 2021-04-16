import React from 'react';

export const Editable = ({ element, ...rest }) => {
    const { mode, field, lang, inode, onClick } = rest;
    const {
        props: { children }
    } = element;
    return React.cloneElement(
        element,
        {
            ...rest,
            onClick:
                onClick &&
                ((e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick();
                }),
            'data-mode': mode || 'minimal',
            'data-field-name': field,
            'data-language': lang,
            'data-inode': inode
        },
        children
    );
};
