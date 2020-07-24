import React, { useState, useContext, useEffect } from 'react';
import PageContext from '../../contexts/PageContext';
import { useRouter } from 'next/router';

const LocaleDropdown = () => {
    const router = useRouter();
    const [language, setLanguage] = useState(typeof localStorage !== "undefined" && localStorage.getItem('dotcms_language'));
    const { languages } = useContext(PageContext);

    useEffect(() => {
        setLanguage(languages.selectedLanguage);
    }, []);

    const handleChange = (value) => {
        setLanguage(value);

        localStorage.setItem('dotcms_language', value);

        const newRoute =
            value === 'en'
                ? router.query.slug.filter((route) => route !== language)
                : [value, ...router.query.slug.filter((route) => route !== value)];

        router.replace('/[[...slug]]', `/${newRoute.join('/')}`);
    };

    return (
        <div className="form-wrap-select">
            <select
                className="form-input"
                value={language}
                onChange={({ target }) => {
                    handleChange(target.value);
                }}
            >
                {languages &&
                    languages.languagesList.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default LocaleDropdown;
