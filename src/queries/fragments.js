import gql from 'graphql-tag';

export const fragments = {
    first: gql`
        fragment FragmentName on Type {
            fields
        }
    `,
};
