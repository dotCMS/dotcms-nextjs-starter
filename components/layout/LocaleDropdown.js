import React, { useState, useContext, useEffect } from 'react';
import PageContext from '../../contexts/PageContext';

const LocaleDropdown = () => {
    const [language, setLanguage] = useState("");
    const { languages } = useContext(PageContext);

    useEffect(() => {
        setLanguage(languages.selectedLanguage);
    }, []);

    return (
        <div className="form-wrap-select">
            <select
                className="form-input"
                value={language}
                onChange={({ target }) => {
                    setLanguage(target.value);
                }}
            >
                {languages && languages.languagesList.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocaleDropdown;
