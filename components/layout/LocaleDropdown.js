import { PageContext } from '../../pages/_app';
import React from 'react';

const Options = ({ languages }) => {
    return languages.map(lang => (
        <option key={lang.languageCode} value={lang.id}>
            {lang.language}
        </option>
    ));
};

const LocaleDropdown = () => {
    //TODO: Remove this after work on select component.
    const tempStyle = {
        minHeight: '56px',
        padding: '15px 22px',
        backgroundColor: 'transparent',
        appearance: 'none',
        WebkitAppearance: 'none',
        borderRadius: '0',
        border:'0',
        outline:'none',
        borderLeft: '1px solid #aeb1be',
        borderRight: '1px solid #aeb1be'
    };

    return (
        <PageContext.Consumer>
            {({ language }) => (
                <select style={tempStyle} defaultValue={language.current} onChange={language.set}>
                    <Options languages={language.options} />
                </select>
            )}
        </PageContext.Consumer>
    );
};

export default LocaleDropdown;
