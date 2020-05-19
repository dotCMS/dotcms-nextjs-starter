import React from 'react';
import logo from '../public/logo.png';
import styled from 'styled-components'

const MainNav = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1rem 0;
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`

const NavMenu = styled.div`
   display: flex;
   nav {
      &> a {
       font-weight: bold;
       text-decoration: none;
      }
  	  &> * + *  {
       margin-left: 1.5rem;
      }
      a:active,
      a:hover,
      .active {
        color: var(--primary-purple);
      }
  	}
  .menu {
    &__list {}
  	&__list:not(:only-child) {
	  margin-right: 4rem;
  	}

  	&__icons {}
  }
`

function Header() {
	return (
		<Container>
			<MainNav className='main-nav'>
				<a className="main-nav__logo" href="#">
					<img src={logo} alt="" width={135} height={41}/>
				</a>
				<NavMenu className="main-nav__menu">
					<nav className="menu__list">
						<a className="active" href="#">Home</a>
						<a href="#">Shop</a>
						<a href="#">About</a>
						<a href="#">Team</a>
						<a href="#">Contact</a>
					</nav>
					<nav className="menu__icons">
						<a href="#">Search</a>
						<a href="#">Cart</a>
					</nav>
				</NavMenu>
			</MainNav>
		</Container>
	);
}

export default Header;
