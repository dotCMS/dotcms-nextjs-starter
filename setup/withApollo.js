import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            uri: 'https://starter.dotcms.com/api/v1/graphql',
            cache: new InMemoryCache().restore(initialState || {}),
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Origin: 'https://demo.dotcms.com',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Headers': 'Accept'
            }
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);
