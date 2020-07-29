import React, { useState, useContext, useEffect } from 'react';
import PageContext from '../../contexts/PageContext';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LanguageSelect = styled.select`
    margin-left: 1rem;
`;

const LanguageSelector = () => {
    const router = useRouter();
    const [language, setLanguage] = useState('');
    const { languageProps } = useContext(PageContext);

    useEffect(() => {
        setLanguage(languageProps.selectedLanguage);
    }, []);

    const getRoute = (value, slug) => {
        if (value === process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE) {
            return slug ? slug.filter((route) => route !== language) : [];
        } else {
            return slug ? [value, ...slug.filter((route) => route !== value)] : [`${value}`];
        }
    };

    const handleLanguageChange = (value) => {
        localStorage.setItem('dotcms_language', value);
        setLanguage(value);
        
        const {
            query: { slug }
        } = router;

        const route = getRoute(value, slug);
        router.replace('/[[...slug]]', `/${route.join('/')}`);
    };

    return (
        <div className="form-wrap-select">
            <LanguageSelect
                className="form-input"
                value={language}
                onChange={({ target }) => {
                    handleLanguageChange(target.value);
                }}
            >
                {languageProps &&
                    languageProps.languages.map((lang) => (
                        <option key={lang.id} value={lang.languageCode}>
                            {lang.language}
                        </option>
                    ))}
            </LanguageSelect>
        </div>
    );
};

export default LanguageSelector;
