import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import {reset} from '../styles/reset';
import { modularScale } from 'polished';

const GlobalStyle = createGlobalStyle`
  :root {
	--primary-black: #444444;
	--primary-purple: #C336E5;
	--primary-spacing: 1.6rem;
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
		margin-bottom: var(--primary-spacing);
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

	p {
		margin-bottom: 1.2rem;
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
`;
export default class MyApp extends App {
	render () {
		const { Component, pageProps } = this.props
		return (
			<Layout>
					<Head>
							<link
									href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
									rel="stylesheet"
							/>
							<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
					</Head>
					<GlobalStyle />
					<Component {...pageProps} />
			</Layout>
    );
	}
}
