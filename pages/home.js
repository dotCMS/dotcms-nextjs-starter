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

function Home(products) {

	return (
		<>
			<Banner />
			<Container>
				<Flex>
					<Sidebar />
					<ProductList products={products.products} />
				</Flex>
			</Container>
		</>
    );
}


export async function getStaticProps() {
    let products = await fetch(
        `${process.env.DOTCMS_HOST}/api/content/render/false/type/json/query/-contentType:forms%20+contentType:Product%20+live:true%20/orderby/modDate%20desc/depth/3/limit/10`
    );
    products = await products.json();

    return {
        props: {
            products: products.contentlets
        },
        unstable_revalidate: 1
    };
}
export default Home;
