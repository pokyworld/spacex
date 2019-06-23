const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        test: {
            type: GraphQLString,
            args: {},
            resolve: (parentValue, args) => {
                return "This GraphQL Server is working";
            }
        }
    }
});

// const mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {
//         add: {},
//         update: {},
//         delete: {}
//     }
// }

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation
});