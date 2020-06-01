import React from 'react';
import Banner from '../../components/Banner';
import Sidebar from '../../components/Sidebar'
import ProductList from '../../components/ProductList';
import withApollo from '../../setup/withApollo'
import { Container } from '../../styles/shared.styles';
import styled from 'styled-components'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const PRODUCT_QUERY = gql`
    {
        ProductCollection(limit: 10) {
            title
            retailPrice
            salePrice
            urlTitle
            productLine {
                title
            }
            host {
                hostName
            }
            image {
                idPath
            }
            image2 {
                idPath
            }
            image3 {
                idPath
            }
        }
    }
`;

function Home() {

	const {
        loading,
        data
    } = useQuery(PRODUCT_QUERY);

	return (
		<>
			<Banner />
			<Container>
				<Flex>
					<Sidebar />
					{loading ? <p>Loading...</p> : <ProductList products={data?.ProductCollection} />}
				</Flex>
			</Container>
		</>
    );
}

export async function getServerSideProps() {
	return {
		props: {}
	}
}

export default withApollo(Home);
