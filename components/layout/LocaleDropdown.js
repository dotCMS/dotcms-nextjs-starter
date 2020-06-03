import PropTypes from 'prop-types';
import PageContext from '../../context/PageContext';
import useDotCMSApi from '../hooks/useDotCMSApi';
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
    const [loading, languages] = useDotCMSApi(getLanguages);

    return (
        <PageContext.Consumer>
            {({ language }) => (
                <div className="form-wrap-select">
                    <select
                        className="form-input"
                        value={language.current}
                        onChange={({target}) => {
                            language.set(target.value);
                        }}
                    >
                        <Options languages={languages}/>
                    </select>
                </div>
            )}
        </PageContext.Consumer>
    );
};

export default LocaleDropdown;
