import Cookies from 'universal-cookie';
import {PageContext} from "../../pages/dotcms";
import React from "react";
import { useState } from 'react';

const cookies = new Cookies();

// let currentLang = '';
//
// const getCurrentLang = () => {
//     setLanguageCookie();
//
// }

const Options = ({languages}) => {
    return  Object.keys(languages).map(key => <option key={key} value={key}>{languages[key].name}</option>)
}

const LocaleDropdown = () => {

    const [languageCookie, setLanguageCookie] = useState(cookies.get('dotSPALang'));

    const aa = (event) => {
        debugger;
        console.log(event.target.value);
        cookies.set('dotSPALang', event.target.value, { path: '/' });
        //currentLang = ;
        setLanguageCookie(event.target.value);
        location.reload();
    };
    console.log('languageCookie', languageCookie);
    return (
        <PageContext.Consumer>
            {({ languages }) => (
                <>
                    current: {languageCookie}
                    <select value={languageCookie} onChange={aa}>
                        <option>Select One</option>
                       <Options languages={languages} />
                    </select>
                </>
            )}
        </PageContext.Consumer>
    );
};

export default LocaleDropdown;
