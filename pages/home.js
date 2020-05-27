import React from 'react';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar'
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import { Container } from '../styles/shared.styles';
import styled from 'styled-components'

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
`

function Home() {
	return (
		<>
			<Banner />
			<Container>
				<Flex>
					<Sidebar />
					<ProductList />
				</Flex>
			</Container>
		</>
    );
}

export default Home;
