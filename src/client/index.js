// Core
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

// Instruments
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: ApolloLink.from([
        setContext(() => {
            const token = localStorage.getItem('token');

            return {
                headers: {
                    authorization: token,
                },
            };
        }),
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        }),
        new HttpLink({
            uri:         'http://localhost:4000/graphql',
            credentials: 'same-origin',
        })
    ]),
    cache,
    resolvers,
    typeDefs,
});

// Create default client cache
cache.writeData({
    data: {
        field: 'some field',
    },
});

export default client;
