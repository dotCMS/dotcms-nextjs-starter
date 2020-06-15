import { createGlobalStyle } from 'styled-components';
import { reset } from '../styles/reset';
import { reflex } from '../styles/reflex';

export const GlobalStyle = createGlobalStyle`
  :root {
	--primary-black: #444444;
	--primary-purple: #C336E5;
	--primary-spacing: 2rem;
  }
  ${reset}
  * {
  	 box-sizing: border-box;
  }

	body {
		line-height: 1.6;
		background-color: #F1F3F4;
		font-family: 'Roboto', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	h1, h2, h3, h4 {
		margin-bottom: 1.6rem;
		font-weight: bold;
	}

	h1 { 
		font-size: 3.375em;
		line-height: 4.75rem;
	}
	h2 { 
		font-size: 2.25em; 
		line-height: 4rem;
		margin-bottom: 1rem;
	}
	h3 { 
		font-size: 1.5em;
		line-height: 1rem;
	 }
	h4 { 
		font-size: 1.125em;
		line-height: .8rem;
	}

	p, ul {
		margin-bottom: 1.2rem;
		color: #4f4f4f;
	}

	b {
		font-weight: bold;
	}

  a {
  	color: var(--primary-black);
		&:hover {
			color: var(--primary-purple);
		}
  }
	nav.menu__list {
		&> a {
			font-weight: 500;
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
	#nprogress .bar {
		background: var(--primary-purple) !important;
	}
	${reflex}
`;
