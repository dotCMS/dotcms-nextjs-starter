import { useState } from 'react';

export default function NavBarSearch() {
    const [active, setActive] = useState(false);
    const [inputActive, setInputActive] = useState(false);

    return (
        <div className={`rd-navbar-search${active ? ' active' : ''}`}>
            <button
                className={`rd-navbar-search-toggle rd-navbar-fixed-element-2${
                    active ? ' active' : ''
                }`}
                data-rd-navbar-toggle=".rd-navbar-search"
                aria-label="Search Box Toggle"
                onClick={() => {
                    setActive(!active);
                }}
            >
                <span />
            </button>
            <form className="rd-search" action="/search/" method="GET">
                <div className="form-wrap">
                    <label
                        className={`form-label search-label${inputActive ? ' label-active' : ''}`}
                        htmlFor="site-search"
                    >
                        Search...
                    </label>
                    <input
                        className="rd-navbar-search-form-input form-input site-search"
                        type="text"
                        name="q"
                        onFocus={() => {
                            setInputActive(!inputActive);
                        }}
                        onBlur={() => {
                            setInputActive(!inputActive);
                        }}
                        autoComplete="off"
                    />
                </div>
                <button
                    className="rd-search-form-submit fa-search"
                    type="submit"
                    aria-label="Submit"
                />
            </form>
        </div>
    );
}
