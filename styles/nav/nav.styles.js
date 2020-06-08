import styled from 'styled-components';

export const MainNav = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--primary-spacing) 0;

    .main-nav {
        &__logo {
            img {
                vertical-align: middle;
            }
        }
    }
`;

export const NavMenu = styled.div`
    display: flex;
    .menu {
        &__list {
        }
        &__list:not(:only-child) {
            margin-right: 4rem;
        }

        &__icons {
        }
    }
`;
