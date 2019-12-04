import PropTypes from 'prop-types';
import { PageContext } from '../../pages/_app';
import useDotCMSApi from '../../hooks/useDotCMSApi';
import { getLanguages } from '../../utils/dotcms';

import React from 'react';

const Options = ({ languages }) => {
    return languages.map((lang) => (
        <option key={lang.languageCode} value={lang.id}>
            {lang.language}
        </option>
    ));
};

Options.propTypes = {
    languages: PropTypes.arrayOf(
        PropTypes.shape({
            languageCode: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            language: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
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
        border: '0',
        outline: 'none',
        borderLeft: '1px solid #aeb1be'
    };

    const [loading, languages] = useDotCMSApi(getLanguages);

    return (
        <PageContext.Consumer>
            {({ language }) => (
                <select
                    style={tempStyle}
                    value={language.current}
                    onChange={({ target }) => {
                        language.set(target.value);
                    }}
                >
                    <Options languages={languages} />
                </select>
            )}
        </PageContext.Consumer>
    );
};

export default LocaleDropdown;
