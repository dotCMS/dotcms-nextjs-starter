import React, { useState, useContext, useEffect } from 'react';
import PageContext from '../../contexts/PageContext';
import Router, { useRouter } from 'next/router';

const LocaleDropdown = () => {
    const router = useRouter();
    const [language, setLanguage] = useState('');
    const { languages } = useContext(PageContext);

    useEffect(() => {
        setLanguage(languages.selectedLanguage);
    }, []);

    const handleChange = (value) => {
        localStorage.setItem('dotcms_language', value);
        setLanguage(value);
        const {
            query: { slug }
        } = router;

        const newRoute =
            value === process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE
                ? slug
                    ? slug.filter((route) => route !== language)
                    : []
                : slug
                ? [value, ...slug.filter((route) => route !== value)]
                : [`${value}`];

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
