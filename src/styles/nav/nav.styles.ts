// Dependencies
import styled from 'styled-components'

export const MainNav = styled.header`
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    align-items: flex-start;
  }
  justify-content: space-between;
  padding: var(--primary-spacing) 0;
  position: relative;
  .main-nav {
    &__logo {
      img {
        vertical-align: middle;
      }
    }
  }
`

export const NavMenu = styled.div<{ isOpen?: boolean }>`
  display: flex;
  .hamburger {
    display: none;
  }
  .menu {
    &__icons {
      a {
        margin-left: 1rem;
      }
    }

    &__list {
      > li {
        position: relative;
      }
      .submenu {
        position: absolute;
        display: none;
        z-index: 6;
        list-style: none;
        background: white;
        top: 25px;
        a {
          margin-left: 0;
          text-decoration: none;
          display: block;
          margin: 0;
          padding: 0.5rem;
          min-width: 9rem;
          border-bottom: 1px solid #f1f1f1;
          &:hover {
            background: #f9f9f9;
          }
        }
        left: 0;
      }
      & > li.hasChildren > a {
        &:after {
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 3px solid #444;
          position: absolute;
          top: 12px;
          right: -10px;
          content: '';
        }
      }
      & > li.hasChildren:hover > ul {
        display: block;
      }
      @media screen and (max-width: 767px) {
        .submenu {
          position: static;
          a {
            margin: 0;
            padding: 0;
            min-width: auto;
            border-bottom: none;
            &:hover {
              background-color: none;
            }
          }
        }
        a.hasChildren {
          &:after {
            top: 12px;
            right: 40px;
          }
        }
      }
    }

    &__list:not(:only-child) {
      margin-right: 2rem;
    }
  }

  @media screen and (max-width: 767px) {
    .hamburger {
      display: block;
    }

    flex-direction: column;
    .menu {
      background: white;
      display: ${(props) => (props.isOpen ? 'block' : 'none !important')};

      &__list {
        display: flex;
        padding: 1.6rem 2rem;
        flex-direction: column;
        margin-bottom: -0.5rem;
        margin-right: 0 !important;
        list-style: none;
        > li {
          margin-left: 0;
          margin-bottom: 0.5rem;
        }
      }
      &__icons {
        border-top: 1px solid #e9e9e9;
        width: 100%;
        z-index: 5;
        display: flex;
        width: 100%;

        img {
          margin: 0 !important;
          vertical-align: middle;
        }

        a:first-child {
          border-right: 1px solid #e9e9e9;
        }

        a:hover {
          background-color: #e9e9e9;
        }

        a {
          width: 100%;
          padding: 1rem;
          background: #f1f1f1;
          vertical-align: middle;
          text-align: center;
        }
      }
    }
  }
`
