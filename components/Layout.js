import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout(props) {
	const { children } = props
	return (
		<div className='layout'>
			<Header />
			{children}

		</div>
		
	);
}

export default Layout;
