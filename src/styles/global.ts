// Dependencies
import { createGlobalStyle } from 'styled-components'

// Internals
import { reflex } from './reflex'
import { reset } from './reset'

export const GlobalStyle = createGlobalStyle`
	:root {
	--primary-black: #444444;
	--dotcms-purple: #C336E5;
	--dotcms-purple-80: hsla(288, 77%, 80%, 1);
	--dotcms-purple-20: hsla(288, 77%, 20%, 1);
	--primary-spacing: 2rem;
	--primary-grey: #F1F3F4;
	}
	${reset}
	* {
			box-sizing: border-box;
	}

	body {
		line-height: 1.6;
		background-color: var(--primary-grey);
		font-family: "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	h1,
	h2,
	h3,
	h4 {
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
	}
	h4 {
		font-size: 1.125em;
	}

	p,
	ul {
		margin-bottom: 1.2rem;
		color: #4f4f4f;
	}

	b {
		font-weight: bold;
	}

	a {
		color: var(--primary-black);
		&:hover {
			color: var(--dotcms-purple);
		}
	}
	nav.menu__list {
		a {
			margin: 0 .5rem;
			text-decoration: none;
			font-weight: bold;
		}
	}
	ul.menu__list {
		list-style: none;
		display: flex;
		 a {
			font-weight: 500;
			text-decoration: none;
		}
		& > * + * {
			margin-left: 1.5rem;
		}
		a:active,
		a:hover,
		li.active > a {
			color: var(--dotcms-purple);
		}
	}
	#nprogress .bar {
		background: var(--dotcms-purple) !important;
	}
	/* Make clicks pass-through */
	#nprogress {
		pointer-events: none;
	}

	#nprogress .bar {
		background: #29d;

		position: fixed;
		z-index: 1031;
		top: 0;
		left: 0;

		width: 100%;
		height: 2px;
	}

	/* Fancy blur effect */
	#nprogress .peg {
		display: block;
		position: absolute;
		right: 0px;
		width: 100px;
		height: 100%;
		box-shadow: 0 0 10px #29d, 0 0 5px #29d;
		opacity: 1;

		-webkit-transform: rotate(3deg) translate(0px, -4px);
		-ms-transform: rotate(3deg) translate(0px, -4px);
		transform: rotate(3deg) translate(0px, -4px);
	}

	/* Remove these to get rid of the spinner */
	#nprogress .spinner {
		display: block;
		position: fixed;
		z-index: 1031;
		top: 15px;
		right: 15px;
	}
	#nprogress .spinner-icon {
		width: 18px;
		height: 18px;
		box-sizing: border-box;

		border: solid 2px transparent;
		border-top-color: #29d;
		border-left-color: #29d;
		border-radius: 50%;

		-webkit-animation: nprogress-spinner 400ms linear infinite;
		animation: nprogress-spinner 400ms linear infinite;
	}

	.nprogress-custom-parent {
		overflow: hidden;
		position: relative;
	}

	.nprogress-custom-parent #nprogress .spinner,
	.nprogress-custom-parent #nprogress .bar {
		position: absolute;
	}

	@-webkit-keyframes nprogress-spinner {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes nprogress-spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap; /* added line */
	}
	.box-product-name {
		margin-bottom: 0;
		a {
			font-size: 1.2rem;
			line-height: 1.6rem;
			font-weight: bold;
			text-decoration: none;
		}
	}
	.box-product-prices .current-price {
		color: grey;
		margin-bottom: 0.5rem;
		display: inline-block;
	}
	.box-product-prices {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	.original-price {
		text-decoration: line-through;
		margin-right: 0.5rem;
	}

	.box-product-img {
		width: 100%;
	}

	.post-classic img {
		width: 100%;
		height: 300px;
	}
	.post-title {
		margin: 1rem 0 0.5rem 0;
	}
	.post-modern > a {
		display: block;
	}
	.post-body {
		position: relative;
	}
	.badge.badge-primary {
		position: absolute;
		top: -48px;
		background: var(--dotcms-purple-80);
		color: var(--dotcms-purple-20);
		padding: 0 0.5rem;
		font-size: 1rem;
		font-style: italic;
	}
	.post-modern .post-img {
		width: 100%;
		object-fit: cover;
	}
	.post-title a {
		text-decoration: none;
		margin: 1rem 0;
		font-size: 1.2rem;
	}
	.col-lg-9.text-center {
		width: 60%;
		z-index: 1;
	}
	.post-modern-time > b {
		margin-right: .5rem;
	}

	.card-title > a {
		font-size: 1.2rem;
		font-weight: bold;
		display: inline-block;
		margin-bottom: 1rem;
		text-decoration: none;
	}
	/* too specific to avoid changing the stater */
	#section-3 > div > div > div > h1.text-center {
		font-size: 2.4rem;
	}
	#section-4 > div > div > div > h2 {
		font-size: 1.8rem;
	}
	.dot-tags__container {
		border: none !important;
		padding: 0 !important;
	}
	dot-form form input[type="text"]:focus {
		border-radius: 3px;
	}
	dot-autocomplete {
		margin: 0 !important;
	}
	dot-form form input[type="text"], 
	dot-autocomplete input {
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: .4rem;
	}

	dot-textarea textarea {
		border: 1px solid #ccc;
		min-height: 250px;
		border-radius: 3px;
	}

	dot-binary-upload-button button {
		padding: .4rem 1rem !important;
		margin-left: 15px !important;
		border-radius: 3px !important;
	}

	#label-accept {
		display: flex;
		flex-direction: row;
		margin-right: 10px;
	}

	.hint-i-agree-to-all-terms-and-conditions-of-travellux-resort-destinations input {
		margin-top: 5px;
    margin-left: 15px;
	}

	${reflex}
`
