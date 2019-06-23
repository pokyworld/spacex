const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

// CustomerType
const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
})

// Root query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // ?query={ customes (id: "2") { id, name, email, age } }
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parentValue, args) => {
                const url = `https://api.pokyworld.local:9443/customers/${args.id}`;
                return axios.get(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        // ?query={ customers { id, name, email, age } }
        customers: {
            type: GraphQLList(CustomerType),
            resolve: (parentValue) => {
                const url = `https://api.pokyworld.local:9443/customers`;
                return axios.get(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
            },
            resolve: (parentType, args) => {
                url = "https://api.pokyworld.local:9443/customers";
                return axios.post(url, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        updateCustomer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve: (parentType, args) => {
                url = `https://api.pokyworld.local:9443/customers/${args.id}`;
                return axios.patch(url, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parentType, args) => {
                url = `https://api.pokyworld.local:9443/customers/${args.id}`;
                return axios.delete(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
