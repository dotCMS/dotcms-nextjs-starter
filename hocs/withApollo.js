import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            uri: 'https://starter.dotcms.com:8443/api/v1/graphql',
            cache: cache.restore(initialState || {})
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
