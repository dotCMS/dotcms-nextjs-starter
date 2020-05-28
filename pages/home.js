import React from 'react';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar'
import ProductList from '../components/ProductList';
import withApollo from '../setup/withApollo'
import { Container } from '../styles/shared.styles';
import styled from 'styled-components'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const PRODUCT_QUERY = gql`
    {ProductCollection(limit: 10) {
            title
            productLine {
                title
            }
        }
    }	
`;

function Home(products) {

	const {loading, data} = useQuery(PRODUCT_QUERY);
	console.log(data);

	return (
		<>
			<Banner />
			<Container>
				<Flex>
					<Sidebar />
					{/* <ProductList products={products.products} /> */}
				</Flex>
			</Container>
		</>
    );
}

export async function getServerSideProps() {


	const data = await fetch(`https://starter.dotcms.com/api/v1/graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: '{ productCollection { title } }' })
	});

	console.log(await data.json());

	return {
		props: {}
	}
}


// export async function getStaticProps() {
//     let products = await fetch(
//         `${process.env.DOTCMS_HOST}/api/content/render/false/type/json/query/-contentType:forms%20+contentType:Product%20+live:true%20/orderby/modDate%20desc/depth/3/limit/10`
//     );
//     products = await products.json();

//     return {
//         props: {
//             products: products.contentlets
//         },
//         unstable_revalidate: 1
//     };
// }
export default withApollo(Home);
