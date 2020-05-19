import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
	--primary-black: #444444;
	--primary-purple: #C336E5;
  }
  * {
  	 box-sizing: border-box;
  }
  body {
     font-family: 'Roboto', sans-serif;
  }

  a {
  	color: var(--primary-black);
	&:hover {
		color: var(--primary-purple);
	}
  }
`
export default class MyApp extends App {
	render () {
		const { Component, pageProps } = this.props
		return (
			<Layout>
				<Head>
					<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
				</Head>
				<GlobalStyle />
				<Component {...pageProps} />
			</Layout>
		)
	}
}
