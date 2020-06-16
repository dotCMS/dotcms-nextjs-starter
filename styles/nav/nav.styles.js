import styled from 'styled-components';

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
`;

export const NavMenu = styled.div`
           display: flex;
           .hamburger {
               display: none;
           }
           @media screen and (max-width: 767px) {
               position: absolute;
               right: 0;
               z-index: 5;
               .hamburger {
                   display: inline-block;
                   text-align: right;
               }
               flex-direction: column;
               .menu {
                   background: white;
                   display: ${props => props.isOpen ? 'block' : 'none !important'};
                   &__list {
                       display: flex;
                       padding: 1.6rem 2rem;
                       flex-direction: column;
                       margin-bottom: -.5rem;
                       margin-right: 0 !important;
                        &> a {
                            margin-left: 0;
                            margin-bottom: .5rem;
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

           .menu {
               &__list {
               }
               &__list:not(:only-child) {
                   margin-right: 2rem;
               }

               &__icons {
                   img {
                       margin-left: 1rem;
                   }
               }
           }
       `;
