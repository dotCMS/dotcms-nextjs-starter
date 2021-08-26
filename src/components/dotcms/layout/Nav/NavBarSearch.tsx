// Dependencies
import * as React from 'react'

export const NavBarSearch = () => {
  const [active, setActive] = React.useState(false)
  const [inputActive, setInputActive] = React.useState(false)

  return (
    <div className={`rd-navbar-search${active ? ' active' : ''}`}>
      <button
        aria-label="Search Box Toggle"
        className={`rd-navbar-search-toggle rd-navbar-fixed-element-2${
          active ? ' active' : ''
        }`}
        data-rd-navbar-toggle=".rd-navbar-search"
        onClick={() => {
          setActive(!active)
        }}
      >
        <span />
      </button>
      <form action="/search/" className="rd-search" method="GET">
        <div className="form-wrap">
          <label
            className={`form-label search-label${
              inputActive ? ' label-active' : ''
            }`}
            htmlFor="site-search"
          >
            Search...
          </label>
          <input
            autoComplete="off"
            className="rd-navbar-search-form-input form-input site-search"
            name="q"
            onBlur={() => {
              setInputActive(!inputActive)
            }}
            onFocus={() => {
              setInputActive(!inputActive)
            }}
            type="text"
          />
        </div>
        <button
          aria-label="Submit"
          className="rd-search-form-submit fa-search"
          type="submit"
        />
      </form>
    </div>
  )
}

export default NavBarSearch
