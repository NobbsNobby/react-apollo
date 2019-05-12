import gql from 'graphql-tag';
import { fragments } from './fragments';

/* Queries */
const QUERY_INFO = gql`
    query getInfo{
        field {
            field
            ...FragmentName
        }
    }
    ${fragments.first}
`;

/* Mutations */

const MUTATION_INFO = gql`
    mutation addRecipe(
        $var1: String!,
        $var2: String!
    ) {
        field(
            field: $var1,
            field: $var2
        ) {
            field
        }
    }
`;

export {
    QUERY_INFO,
    MUTATION_INFO
};
